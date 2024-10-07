<script lang="ts">
  import { Button } from "$components";
  import { convertFileToBase64 } from "$lib/utils/openai-helpers";
  import Icon from "@iconify/svelte";
  import Dropzone from "svelte-file-dropzone";

  let isLoading = $state(false);
  let errorMessage = $state("");
  let recognizedBooks = $state<OpenAiBook[]>([]);
  let booksSuccessfullyAdded = $state(false);

  interface OpenAiBook {
    author: string;
    bookTitle: string;
  }

  async function handleDrop(e: CustomEvent<any>) {
    const { acceptedFiles } = e.detail;

    if (acceptedFiles.length) {
      isLoading = true;
      const fileToSendToOpenAi = acceptedFiles[0];
      const base64String = await convertFileToBase64(fileToSendToOpenAi);

      try {
        const response = await fetch("/api/scan-shelf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64: base64String }),
        });

        isLoading = false;
        const result = (await response.json()) as { bookArray: OpenAiBook[] };
        recognizedBooks = result.bookArray;
      } catch (error) {
        errorMessage = "Error processing the uploaded file.";
      }
    } else {
      errorMessage = `Could not upload given file. Are you sure it's an image with a file size of less than 10MB?`;
    }
  }
</script>

<h2 class="mt-m mb-l">Take a picture to add books</h2>
{#if recognizedBooks.length === 0}
  <div class="upload-area">
    <div class="upload-container">
      {#if errorMessage}
        <h4 class="text-center mb-s upload-error">
          {errorMessage}
        </h4>
      {/if}
      {#if isLoading}
        <div class="spinner-container">
          <div class="spinner"></div>
          <p>Processing your books.</p>
        </div>
      {:else}
        <Dropzone
          on:drop={handleDrop}
          multiple={false}
          accept="image/*"
          maxSize={10 * 1024 * 1024}
          containerClasses={"dropzone-cover"}
        >
          <Icon icon="bi:camera-fill" width={"40px"} />
          <p>Drag a picture here or click to select a file</p></Dropzone
        >
      {/if}
    </div>
  </div>
{:else if !booksSuccessfullyAdded}
  <div class="found-books">
    <table class="book-list mb-m">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each recognizedBooks as book, i}
          <tr>
            <td>{book.bookTitle}</td>
            <td>{book.author}</td>
            <td>
              <button
                type="button"
                aria-label="Remove book"
                class="remove-book"
                onclick={() => console.log(`Delete book with index ${i}`)}
              >
                <Icon icon="streamline:delete-1-solid" width={"24"} />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Button onclick={() => console.log("add all remaining books")}
      >Add all books</Button
    >
  </div>
{:else}
  <h4>
    The selected {recognizedBooks.length} books have been added to your library.
  </h4>
  <Button href="/private/dashboard">Go to your library</Button>
{/if}

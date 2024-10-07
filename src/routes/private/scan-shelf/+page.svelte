<script lang="ts">
  import { convertFileToBase64 } from "$lib/utils/openai-helpers";
  import Icon from "@iconify/svelte";
  import Dropzone from "svelte-file-dropzone";

  let isLoading = $state(false);

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

        const result = (await response.json()) as { bookArray: OpenAiBook[] };

        console.log(result);
      } catch (error) {}
    }
  }
</script>

<h2 class="mt-m mb-l">Take a picture to add books</h2>
<div class="upload-area">
  <div class="upload-container">
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
  </div>
</div>

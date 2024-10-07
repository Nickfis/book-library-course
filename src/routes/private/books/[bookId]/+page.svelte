<script lang="ts">
  import { Button, StarRating } from "$components";
  import type { Book } from "$lib/state/user-state.svelte";
  import Icon from "@iconify/svelte";

  interface BookPageProps {
    data: {
      book: Book;
    };
  }

  let { data }: BookPageProps = $props();
  let book = $derived(data.book);

  function goBack() {
    history.back();
  }
</script>


{#snippet bookInfo()}
<h2 class="book-title mt-m">{book.title}</h2>
<p class="book-author">by {book.author}</p>
<h4 class="mt-m mb-xs semi-bold">Your rating</h4>
<StarRating value={book.rating || 0} />
<p class="small-font">
  Click to {book.rating ? "change" : "give"} rating
</p>
{#if book.description}
  <h4 class="mt-m mb-xs semi-bold">Description</h4>
  <p class="mb-m">{book.description}</p>
{:else}
  <h4 class="mt-m mb-xs semi-bold">No description yet.</h4>
  <button
    class="block mb-m"
    onclick={() => console.log("toggle on the edit mode")}
  >
    <p>Click to add one.</p>
  </button>
{/if}
{#if !book.finished_reading_on}
  <Button
    isSecondary={true}
    onclick={() => console.log("Updating reading status")}
  >
    {book.started_reading_on
      ? "I finished reading this book!"
      : "I started reading this book"}
  </Button>
{/if}
{#if book.genre}
  <h4 class="mt-m mb-xs semi-bold">Genre</h4>
  <p>{book.genre}</p>
{/if}
{/snippet}

<div class="book-page">
    <button onclick={goBack} aria-label="Go back">
        <Icon icon="ep:back" width={"40"} />
    </button>
    <div class="book-container">
        <div class="book-info">
            {@render bookInfo()}
        </div>
        <div class="book-cover">
            {#if book.cover_image}
            <img src={book.cover_image} alt="" />
            {:else}
            <button class="add-cover">
                <Icon icon="bi:camera-fill" width={"40"} />
                <p>Add book cover</p>
            </button>
            {/if}
        </div>
    </div>
</div>
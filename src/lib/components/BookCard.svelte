<script lang="ts">
  import type { Book } from "$lib/state/user-state.svelte";

  interface BookCardProps {
    book: Book;
  }

  let { book }: BookCardProps = $props();

  let bookStatus = $derived(
    book.finished_reading_on
      ? "Finished"
      : book.started_reading_on
        ? "Currently reading"
        : "Not started"
  );
</script>

<a class="book-card" href={`/private/books/${book.id}`}>
  <div class="book-status">
    <span>{bookStatus}</span>
  </div>
  <div class="book-cover">
    {#if book.cover_image}
      <img src={book.cover_image} alt="" />
    {/if}
  </div>
  <div class="book-info">
    <h4>{book.title}</h4>
    <p class="mb-s">{book.author}</p>
    <p>Rating: {book.rating}</p>
  </div>
</a>

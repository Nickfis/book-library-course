<script lang="ts">
  import { BookCard } from "$components";
  import type { Book } from "$lib/state/user-state.svelte";

  interface BookCategoryProps {
    categoryName: string;
    booksToDisplay: Book[];
  }

  let { categoryName, booksToDisplay }: BookCategoryProps = $props();
</script>

<section class="book-category mb-m">
  <h3 class="mb-s">{categoryName}</h3>
  <div class="books-container">
    {#each booksToDisplay as book}
      <BookCard {book} />
    {/each}
  </div>
</section>

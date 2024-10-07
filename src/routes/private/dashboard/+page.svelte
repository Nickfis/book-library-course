<script lang="ts">
  import { BookCard, BookCategory } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";
  import Icon from "@iconify/svelte";

  let userContext = getUserState();
  let { userName, allBooks } = $derived(userContext);
</script>

<div class="dashboard">
  <div class="dashboard-header mb-m">
    <a href="/private/scan-shelf" class="add-book">
      <Icon icon="icons8:plus" width={"72"} height={"72"} />
      <p>Add a book</p>
    </a>
    <div class="headline">
      <h3 class="bold mb-xs">Welcome Back, {userName}</h3>
      <p>
        There's nothing quite like the journey a good book can take you on. Have
        you discovered any new favorites recently?
      </p>
    </div>
  </div>
  <BookCategory
    booksToDisplay={allBooks.slice(0, 10)}
    categoryName={"Your favorite books"}
  />
</div>

<style>
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .add-book {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .add-book p {
    margin-left: 8px;
  }

  .headline {
    text-align: right;
    max-width: 30%;
    min-width: 300px;
  }
</style>

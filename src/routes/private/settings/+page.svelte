<script lang="ts">
  import { Button } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let userName = $state(userContext.userName || "");
  let isEditMode = $state(true);
  let email = $state(userContext.user?.email || "");

  let averageRating = $derived.by(() => {
    const booksWithRating = userContext.allBooks.filter((book) => book.rating);

    if (booksWithRating.length === 0) {
      return "No ratings yet.";
    }

    const sumOfAllRatings = booksWithRating.reduce(
      (acc, book) => acc + book.rating!,
      0
    );
    const averageRating =
      Math.round(100 * (sumOfAllRatings / booksWithRating.length)) / 100;
    return averageRating;
  });

  $effect(() => {
    if (userContext.userName) {
      userName = userContext.userName;
    }
  });
</script>

<div class="settings-page">
  <div class="settings-container">
    <h2>Settings</h2>

    <h5 class="mt-m mb-xs semi-bold">Username</h5>
    {#if isEditMode}
      <input type="text" name="userName" bind:value={userName} />
    {:else}
      <h3>{userName}</h3>
    {/if}
    <h5 class="mt-m mb-xs semi-bold">Email Address</h5>
    {#if isEditMode}
      <input type="text" name="email" bind:value={email} />
    {:else}
      <h3>{email}</h3>
    {/if}
    <div class="buttons-container mt-l">
      <Button isSecondary={true} onclick={() => console.log("edit mode?")}>
        {isEditMode ? "Save changes" : "Edit"}
      </Button>
      <Button isDanger={true} onclick={() => console.log("delete account")}
        >Delete account</Button
      >
    </div>
  </div>
  <div class="stats-container">
    <h5 class="semi-bold">Books in library</h5>
    <h3>{userContext.allBooks.length}</h3>
    <h5 class="semi-bold mt-m">Finished books</h5>
    <h3>
      {userContext.allBooks.filter((book) => Boolean(book.finished_reading_on))
        .length}
    </h3>
    <h5 class="semi-bold mt-m">Average rating given</h5>
    <h3>{averageRating}</h3>
  </div>
</div>

<style>
  .settings-page {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  .settings-container {
    margin-right: 80px;
  }

  .settings-container input {
    width: 100%;
  }

  .stats-container {
    min-width: 25%;
    border-radius: 12px;
    padding: 8px 24px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-bottom: 40px;
  }
</style>

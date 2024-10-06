<script lang="ts">
  import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let { allBooks } = $derived(userContext);

  $inspect(allBooks);
</script>

<ul>
  {#each allBooks as book}
    <li>{book.title}</li>
  {/each}
</ul>

<script lang="ts">
  import bookNestLogo from "$assets/app-logo.svg";
  import { Button } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let { user } = $derived(userContext);
</script>

<header>
  <a href="/">
    <img class="logo" src={bookNestLogo} alt="Go to home" />
  </a>
  <nav>
    {#if !user}
      <ul>
        <li>
          <Button isMenu={true} href="/register">Create account</Button>
        </li>
        <li>
          <Button isMenu={true} isSecondary={true} href="/login">Login</Button>
        </li>
      </ul>
    {:else}
      <ul>
        <li>
          {user.email}
        </li>
        <li>
          <Button isMenu={true} onclick={() => userContext.logout()}
            >Logout</Button
          >
        </li>
      </ul>
    {/if}
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 4vw;
  }
  ul {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }

  .logo {
    height: 72px;
  }
</style>

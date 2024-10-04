<script lang="ts">
  import { Button } from "$components";

  interface ComponentProps {
    isRegistration: boolean;
  }

  let { isRegistration }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
  <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
  <div class="form-and-social-login">
    <form class="auth-form">
      {#if isRegistration}
        <input placeholder="Name" type="text" name="name" />
      {/if}
      <input placeholder="Email" type="text" name="email" />
      <input placeholder="Password" type="password" name="password" />
      {#if isRegistration}
        <input
          placeholder="Confirm password"
          type="password"
          name="passwordConfirmation"
        />
      {/if}
      <Button type="submit">{isRegistration ? "Register" : "Login"}</Button>
      {#if isRegistration}
        <p class="auth-hint mt-s">
          Already have an account? <a href="/login">Log In.</a>
        </p>
      {:else}
        <p class="auth-hint mt-s">
          Do not have an account yet? <a href="/register">Log In.</a>
        </p>
      {/if}
    </form>
    <div class="social-login">
      <!-- Add a button here later -->
    </div>
  </div>
</div>

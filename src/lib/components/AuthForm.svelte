<script lang="ts">
  import { Button } from "$components";
  import type { ActionData } from "../../routes/register/$types";

  interface ComponentProps {
    isRegistration: boolean;
    form: ActionData;
  }

  let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
  <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
  <div class="form-and-social-login">
    <form class="auth-form" method="POST">
      {#if form && form.errors?.length}
        {#each form.errors as error}
          <div class="auth-error">
            <p>{error}</p>
          </div>
        {/each}
      {/if}
      {#if isRegistration}
        <input
          placeholder="Name"
          type="text"
          name="name"
          value={form?.name || ""}
        />
      {/if}
      <input
        placeholder="Email"
        type="text"
        name="email"
        value={form?.email || ""}
      />
      <input
        placeholder="Password"
        type="password"
        name="password"
        value={form?.password || ""}
      />
      {#if isRegistration}
        <input
          placeholder="Confirm password"
          type="password"
          name="passwordConfirmation"
          value={form?.passwordConfirmation || ""}
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

<style>
  .auth-container {
    margin-top: 80px;
  }

  .form-and-social-login {
    display: flex;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: start;
    border-right: 1px solid grey;
    padding-right: 80px;
    width: 40%;
  }

  .auth-hint {
    font-size: 16px;
    color: grey;
  }

  .auth-error {
    background-color: rgb(122, 35, 35);
    color: white;
    font-size: 18px;
    border-radius: 12px;
    padding: 12px;
    width: 100%;
    margin-bottom: 8px;
  }

  .auth-error:last-of-type {
    margin-bottom: 16px;
  }

  .auth-form input {
    width: 100%;
    margin-bottom: 12px;
  }

  .auth-form input:last-of-type {
    margin-bottom: 30px;
  }

  .social-login {
    padding-left: 80px;
    width: 40%;
  }
</style>

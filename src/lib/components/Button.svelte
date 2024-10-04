<script lang="ts">
  import type { Snippet } from "svelte";

  interface BasicProps {
    children: Snippet;
    isSecondary?: boolean;
    isDanger?: boolean;
    isMenu?: boolean;
  }

  interface ButtonProps extends BasicProps {
    onclick: (e: MouseEvent) => void;
    href?: never;
  }

  interface LinkProps extends BasicProps {
    href: string;
    onclick?: never;
  }

  type ComponentProps = ButtonProps | LinkProps;

  let {
    children,
    href,
    onclick,
    isSecondary,
    isDanger,
    isMenu,
    ...props
  }: ComponentProps = $props();
</script>

{#if href}
  <a
    {href}
    class="btn"
    class:btn-secondary={isSecondary}
    class:btn-danger={isDanger}
    class:btn-menu={isMenu}
  >
    {@render children()}
  </a>
{:else}
  <button
    {...props}
    {onclick}
    class="btn"
    class:btn-secondary={isSecondary}
    class:btn-danger={isDanger}
    class:btn-menu={isMenu}
  >
    {@render children()}
  </button>
{/if}

<style>
    .btn {
        padding: 12px 24px;
        min-width: 230px;
        text-align: center;
        background-color: black;
        border-radius: 12px;
        color: white;
        border: 1px solid white;
        font-weight: normal;
        font-size: 22px;
    }

    .btn-secondary {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .btn-danger {
        background-color: rgb(136, 4, 4);
    }

    .btn-menu {
        min-width: 150px;
        padding: 8px 20px;
    }
</style>
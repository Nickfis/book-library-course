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

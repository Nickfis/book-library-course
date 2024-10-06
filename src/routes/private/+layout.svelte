<script>
  import { SideNavigation } from "$components";
  let { children } = $props();
</script>

<div class="auth-area">
  <SideNavigation />
  <div class="main-area">
    {@render children()}
  </div>
</div>

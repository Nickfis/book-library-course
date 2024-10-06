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

<style>
    .auth-area {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }
    .main-area {
        flex: 1;
        min-width: 0;
        padding: 40px 4vw 100px 40px;
        overflow-y: auto;
    }
</style>

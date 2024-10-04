<script lang="ts">
  import { Header } from "$components";
import "./../app.css";

  let { children } = $props();
</script>

<Header />
{@render children()}

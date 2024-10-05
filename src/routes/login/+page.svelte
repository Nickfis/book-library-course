<script lang="ts">
  import { AuthForm } from "$components";

  let { form } = $props();
</script>

<AuthForm isRegistration={false} {form} />

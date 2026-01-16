<script lang="ts">
  import { onDestroy } from "svelte";

  interface Props {
    birthDate: string;
  }

  const {birthDate}: Props = $props();

  const ONE_YEAR_IN_MS = 31556952000;
  let preciseAge: string = $state('0');

  const update = () => {
    const now = new Date().getTime();
    const birth = new Date(birthDate).getTime();
    const diff = now - birth;

    const exactAge = diff / ONE_YEAR_IN_MS;
    preciseAge = exactAge.toFixed(9);
  };

  const updateInterval = setInterval(update, 50);

  onDestroy(() => {
    clearInterval(updateInterval);
  });
</script>

<p class="monospace">{preciseAge}</p>
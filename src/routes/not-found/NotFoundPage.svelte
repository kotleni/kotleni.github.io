<script lang="ts">
    import {CloudOff} from '@lucide/svelte';
    import FancyHomeButton from '@/lib/FancyHomeButton.svelte';
</script>

<div
    class="w-full min-h-1 grow flex-1 flex flex-col items-center justify-center gap-4 text-center p-6"
>
    <div>
        <CloudOff class="w-18 h-18 opacity-80" />
    </div>
    <h1 class="text-2xl font-bold">404 — Lost in space</h1>
    <p class="text-sm opacity-70">This page wandered off somewhere.</p>
    <FancyHomeButton />
</div>

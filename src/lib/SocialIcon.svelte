<script lang="ts">
    import type {Component} from 'svelte';

    interface Props {
        label: string;
        iconComponent: Component;
        destinationUrl: string;
    }

    const {label, iconComponent: Icon, destinationUrl}: Props = $props();
</script>

<a href={destinationUrl} target="_blank" aria-label={label}>
    <div class="size-4 cursor-pointer hover:text-primary">
        <Icon />
    </div>
</a>

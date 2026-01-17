<script lang="ts">
    interface Props {
        label: string;
    }

    const {label}: Props = $props();
</script>

<div
    class="px-2 py-0.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm cursor-pointer"
>
    {label}
</div>

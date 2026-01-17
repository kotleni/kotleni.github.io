<script lang="ts">
    interface Props {
        text: string;
    }

    const {text}: Props = $props();
</script>

<h2 class="font-bold text-2xl text-foreground">{text}</h2>

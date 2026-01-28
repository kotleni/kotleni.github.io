<script lang="ts">
    import type {Badge} from '@/data/badges';

    interface Props {
        badge: Badge;
    }

    const {badge}: Props = $props();
</script>

<a href={badge.targetUrl} class="hover:opacity-80 cursor-pointer">
    <img src={badge.imageUrl} alt="" class="h-8" />
</a>

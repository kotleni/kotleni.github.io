<script lang="ts">
    import {cn} from './utils';

    interface Props {
        title: string;
        url: string;
    }

    const {title, url}: Props = $props();
    const isActive = false;
</script>

<a
    href={url}
    class={cn(
        'bold lg:p-2 text-lg md:text-base text-primary/80 hover:underline hover:text-primary',
        isActive ? 'underline' : '',
    )}
>
    {title}
</a>

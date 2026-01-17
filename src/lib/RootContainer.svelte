<script lang="ts">
    import type {Snippet} from 'svelte';
    import PageNavigationLink from './PageNavigationLink.svelte';
    import {cn} from './utils';

    interface NavLinkInfo {
        title: string;
        url: string;
    }

    interface Props {
        children: Snippet<[]>;
    }

    const navLinks: NavLinkInfo[] = [
        {title: 'about', url: '/'},
        {title: 'projects', url: '/#/projects'},
        {title: 'blog', url: '/#/blog'},
    ];

    const {children}: Props = $props();
</script>

<div
    class={cn(
        'flex flex-col',
        'w-full md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99',
    )}
>
    <div
        class="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1"
    >
        <p class="text-sm">I migrating to new domain - kotle.uk</p>
    </div>
    <header class="flex flex-row justify-end p-3 md:p-0">
        <div class="flex flex-row gap-2">
            {#each navLinks as link (link)}
                <PageNavigationLink title={link.title} url={link.url} />
            {/each}
        </div>
    </header>
    <div>
        <main class={cn('pb-4', 'h-full flex flex-col')}>
            {@render children?.()}
        </main>
    </div>
</div>

<script lang="ts">
    import {cn} from '@/lib/utils';
    import type {Snippet} from 'svelte';
    import PageNavigationLink from '@/lib/PageNavigationLink.svelte';
    import StyledLink from '@/lib/StyledLink.svelte';

    interface NavLinkInfo {
        title: string;
        url: string;
    }

    interface Props {
        children: Snippet<[]>;
    }

    const navLinks: NavLinkInfo[] = [
        {title: 'about', url: '/#/'},
        {title: 'projects', url: '/#/projects'},
        {title: 'blog', url: '/#/blog'},
    ];

    const {children}: Props = $props();

    let isMenuOpen = $state(false);
</script>

<div
    class={cn(
        'flex flex-col',
        'w-full md:container px-4 sm:px-12 md:px-8 lg:px-40 xl:px-72 2xl:px-99',
    )}
>
    <div
        class="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1"
    >
        <p class="text-sm">
            This site is now running on <StyledLink href="https://svelte.dev/"
                >Svelte</StyledLink
            >.
        </p>
    </div>
    <header class="flex flex-row justify-end p-3 md:p-0">
        <div class="flex flex-row flex-wrap gap-2">
            {#each navLinks.slice(0, isMenuOpen ? 999 : 3) as link (link)}
                <PageNavigationLink title={link.title} url={link.url} />
            {/each}
            {#if navLinks.length > 3}
                <button
                    onclick={() => {
                        isMenuOpen = !isMenuOpen;
                    }}
                    class="bold lg:p-2 text-lg md:text-base text-primary/60 hover:underline hover:text-primary cursor-pointer"
                >
                    {isMenuOpen ? '[less]' : '[more]'}
                </button>
            {/if}
        </div>
    </header>
    <div class={cn('pb-4', 'w-full h-full flex flex-col')}>
        {@render children?.()}
    </div>
</div>

<script lang="ts">
    import Title from '../../lib/Title.svelte';

    interface Post {
        title: string;
        url: string;
        isNew: boolean;
        description: string;
    }

    const posts: Post[] = [
        {
            title: 'My hosting infrastructure',
            url: '/#/blog/hosting-infrastructure-early2026',
            isNew: true,
            description:
                'For non-production purposes, I have two servers: a VPS from OVHCloud and a home lab with a single HP EliteDesk'
        },
        {
            title: 'Why i abandoned idea of using Asahi Linux',
            url: '/#/blog/asahi-linux',
            isNew: false,
            description:
                "I am a Linux guy. I've used it on my VPS and home lab for years. On my desktop computer, I run Arch Linux exclusively, and I fully enjoy"
        },
        {
            title: 'The sixth iteration of my website',
            url: '/#/blog/new-website-v6',
            isNew: false,
            description:
                "Throughout my life, I've created a bunch of different websites with various designs, but none of them ever felt quite right for my personal page"
        }
    ];
</script>

{#snippet postEntry(post: Post)}
    <div>
        <div class="flex flex-row gap-2">
            <a class="hover:underline" href={post.url}>
                <p class="font-bold text-primary">
                    {post.title}
                </p>
            </a>
            {#if post.isNew}
                <p class="font-bold text-destructive">New!</p>
            {/if}
        </div>
        <p>{post.description}...</p>
    </div>
{/snippet}

<div class="flex flex-col gap-4 pt-4">
    <Title text="Blog posts" />
    {#each posts as post (post.url)}
        {@render postEntry(post)}
    {/each}
</div>
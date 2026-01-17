<script lang="ts">
    import Title from '@/lib/Title.svelte';
    import type {Post} from '@/data/blog-posts';
    import {posts} from '@/data/blog-posts';
</script>

{#snippet postEntry(post: Post)}
    <div>
        <div class="flex flex-row gap-2">
            <a class="hover:underline" href={`/#/blog/${post.url}`}>
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

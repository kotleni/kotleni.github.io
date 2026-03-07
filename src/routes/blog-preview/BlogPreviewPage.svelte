<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    /* 
        Using [at]html can lead to XSS attacks,
        but since there is no user generated content 
        it is safe to ignore this error.
     */

    interface RouteParams {
        postId: string;
    }

    export let params: RouteParams = {postId: ''};

    const fetchPost = async (postId: string) => {
        try {
            const module = await import(`@/markdown/${postId}.md`);
            return module.default;
        } catch (e) {
            console.error(e);
            return '<h1>Post not found</h1>';
        }
    };
</script>

{#await fetchPost(params.postId)}
    <div class="loading">Loading post...</div>
{:then html}
    <div class="blog-post">
        {@html html}
    </div>
{/await}

<style>
    .blog-post :global(h1) {
        font-size: 1.875rem;
        font-weight: 800;
        margin: 2rem 0 1rem 0;
        color: var(--foreground);
    }
    .blog-post :global(h2) {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 1.5rem 0 0.75rem 0;
        color: var(--foreground);
    }
    .blog-post :global(h3) {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 1.25rem 0 0.5rem 0;
        color: var(--foreground);
    }
    .blog-post :global(h4) {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 1rem 0 0.5rem 0;
        color: var(--foreground);
    }

    .blog-post :global(p) {
        font-size: 1rem;
        line-height: 1.625;
        margin-bottom: 1rem;
        color: var(--foreground);
    }

    .blog-post :global(strong) {
        font-weight: 700;
        color: var(--foreground);
    }
    .blog-post :global(em) {
        font-style: italic;
    }

    .blog-post :global(a) {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
    }
    .blog-post :global(a:hover) {
        text-decoration: underline;
    }

    .blog-post :global(ul),
    .blog-post :global(ol) {
        list-style-position: inside;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
    .blog-post :global(ul) {
        list-style-type: disc;
    }
    .blog-post :global(ol) {
        list-style-type: decimal;
    }
    .blog-post :global(li) {
        margin-bottom: 0.5rem;
    }

    .blog-post :global(blockquote) {
        border-left: 4px solid var(--muted);
        padding-left: 1rem;
        font-style: italic;
        margin: 1.5rem 0;
        color: var(--muted-foreground);
    }

    .blog-post :global(pre) {
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.875rem;
        font-family: 'mononoki', monospace;
        background-color: var(--input);
        color: var(--foreground);
        border-radius: var(--radius-md);
        margin-bottom: 1.25rem;
        border: 1px solid var(--border);
    }

    .blog-post :global(table) {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        margin: 1.5rem 0;
    }
    .blog-post :global(thead) {
        background-color: var(--card);
    }
    .blog-post :global(th) {
        padding: 0.75rem 1rem;
        font-weight: 700;
        font-size: 0.875rem;
        text-transform: uppercase;
        color: var(--card-foreground);
    }
    .blog-post :global(td) {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border);
        color: var(--foreground);
    }

    .blog-post :global(hr) {
        margin: 2.5rem 0;
        border: 0;
        border-top: 1px solid var(--border);
    }

    .loading {
        text-align: center;
        font-size: 1rem;
        padding: 2rem;
        color: var(--foreground);
    }
</style>

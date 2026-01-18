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

    export const params: RouteParams = {postId: ''};

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
        margin-bottom: 1rem;
        margin-top: 2rem;
        color: white;
    }
    .blog-post :global(h2) {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        margin-top: 1.5rem;
        color: white;
    }
    .blog-post :global(h3) {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        margin-top: 1.25rem;
    }
    .blog-post :global(h4) {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    }

    .blog-post :global(p) {
        font-size: 1rem;
        line-height: 1.625;
        margin-bottom: 1rem;
        color: #d4d4d4;
    }
    .blog-post :global(strong) {
        font-weight: 700;
        color: white;
    }
    .blog-post :global(em) {
        font-style: italic;
    }

    .blog-post :global(a) {
        color: var(--color-primary, #3b82f6);
        text-decoration: none;
        font-weight: 500;
    }
    .blog-post :global(a:hover) {
        text-decoration: underline;
    }

    .blog-post :global(ul) {
        list-style-type: disc;
        list-style-position: inside;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
    .blog-post :global(ol) {
        list-style-type: decimal;
        list-style-position: inside;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
    .blog-post :global(li) {
        margin-bottom: 0.5rem;
    }

    /* Blockquote */
    .blog-post :global(blockquote) {
        border-left: 4px solid #404040;
        padding-left: 1rem;
        font-style: italic;
        margin: 1.5rem 0;
        color: #a3a3a3;
    }

    .blog-post :global(pre) {
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.875rem;
        font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        background-color: #171717; /* dark neutral */
        color: #e5e5e5;
        border-radius: 0.375rem;
        margin-bottom: 1.25rem;
        border: 1px solid #262626;
    }

    .blog-post :global(table) {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        margin: 1.5rem 0;
    }
    .blog-post :global(thead) {
        background-color: #262626;
    }
    .blog-post :global(th) {
        padding: 0.75rem 1rem;
        font-weight: 700;
        font-size: 0.875rem;
        text-transform: uppercase;
        color: #737373;
    }
    .blog-post :global(td) {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #262626;
        color: #d4d4d4;
    }

    .blog-post :global(hr) {
        margin: 2.5rem 0;
        border: 0;
        border-top: 1px solid #262626;
    }
</style>

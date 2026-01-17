<script lang="ts">
    import Router from 'svelte-spa-router';
    import RootContainer from '@/lib/RootContainer.svelte';

    import RootPage from '@/routes/root/RootPage.svelte';
    import ProjectsPage from '@/routes/projects/ProjectsPage.svelte';
    import BlogPage from '@/routes/blog/BlogPage.svelte';
    import BlogPreviewPage from '@/routes/blog-preview/BlogPreviewPage.svelte';
    import NotFoundPage from './routes/not-found/NotFoundPage.svelte';
</script>

<main class="w-full">
    <RootContainer>
        <Router
            routes={{
                '/': RootPage,
                '/projects': ProjectsPage,
                '/blog': BlogPage,
                '/blog/:postId': BlogPreviewPage,

                '/not-found': NotFoundPage,
                '*': NotFoundPage,
            }}
        />
    </RootContainer>
</main>

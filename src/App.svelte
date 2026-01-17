<script lang="ts">
    import Router from 'svelte-spa-router';
    import RootContainer from '@/lib/RootContainer.svelte';

    import RootPage from '@/routes/root/RootPage.svelte';
    import ProjectsPage from '@/routes/projects/ProjectsPage.svelte';
    import BlogPage from '@/routes/blog/BlogPage.svelte';
    import BlogPreviewPage from '@/routes/blog-preview/BlogPreviewPage.svelte';
    import NotFoundPage from './routes/not-found/NotFoundPage.svelte';
    import NudesPage from './routes/nudes/NudesPage.svelte';

    console.log('Hello, world!');
</script>

<main class="w-full flex flex-col items-center">
    <RootContainer>
        <Router
            routes={{
                '/': RootPage,
                '/projects': ProjectsPage,
                '/blog': BlogPage,
                '/blog/:postId': BlogPreviewPage,
                '/nudes': NudesPage,

                '/not-found': NotFoundPage,
                '*': NotFoundPage,
            }}
        />
    </RootContainer>
</main>

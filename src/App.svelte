<script lang="ts">
    import Router from "svelte-spa-router";
    import RootContainer from "./lib/RootContainer.svelte";

    import RootPage from "./routes/root/RootPage.svelte";
    import ProjectsPage from "./routes/projects/ProjectsPage.svelte";
    import BlogPage from "./routes/blog/BlogPage.svelte";
</script>

<main>
    <RootContainer>
        <Router routes={{
            '/': RootPage,
            '/projects': ProjectsPage,
            '/blog': BlogPage,
            }} />
    </RootContainer>
</main>
<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const html = ref<string | null>(null);
const loading = ref(true);

const fetchPost = async (postId: string) => {
    try {
        const module = await import(`@/markdown/${postId}.md`);
        return module.default;
    } catch (e) {
        console.error(e);
        return '<h1>Post not found</h1>';
    }
};

watchEffect(async () => {
    loading.value = true;
    const postId = route.params.postId as string;
    html.value = await fetchPost(postId);
    loading.value = false;
});
</script>

<template>
    <div class="post-container">
        <div v-if="loading" class="loading">Loading post...</div>
        <div v-else class="blog-post" v-html="html" />
    </div>
</template>

<style>
.post-container {
    padding: 0px 16px 0px 16px;
}
.blog-post h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: var(--foreground);
}
.blog-post h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--foreground);
}
.blog-post h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--foreground);
}
.blog-post h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--foreground);
}

.blog-post p {
    font-size: 1rem;
    line-height: 1.625;
    margin-bottom: 1rem;
    color: var(--foreground);
}

.blog-post strong {
    font-weight: 700;
    color: var(--foreground);
}
.blog-post em {
    font-style: italic;
}

.blog-post ul,
.blog-post ol {
    list-style-position: inside;
    margin-left: 1rem;
    margin-bottom: 1rem;
}
.blog-post ul {
    list-style-type: disc;
}
.blog-post ol {
    list-style-type: decimal;
}
.blog-post li {
    margin-bottom: 0.5rem;
}

.blog-post blockquote {
    border-left: 4px solid var(--muted);
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: var(--muted-foreground);
}

.blog-post pre {
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

.blog-post table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin: 1.5rem 0;
}
.blog-post thead {
    background-color: var(--card);
}
.blog-post th {
    padding: 0.75rem 1rem;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    color: var(--card-foreground);
}
.blog-post td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border);
    color: var(--foreground);
}

.blog-post hr {
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

<script setup lang="ts">
import {posts} from '@/data/blog-posts';
</script>

<template>
    <div class="container">
        <h2>posts.</h2>
        <div class="blog-list">
            <div v-for="post in posts" :key="post.title" class="blog-item">
                <div class="post-title">
                    <RouterLink :to="'/blog/' + post.url">{{
                        post.title
                    }}</RouterLink
                    ><span v-if="post.isNew" class="new-badge">New!</span>
                </div>
                <div class="post-description">{{ post.description }}...</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blocks {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.container {
    width: 100%;
    padding: 16px;

    background-color: var(--color-card);
    border: 0px solid var(--color-primary);
    border-radius: 6px;
}
@media screen and (width < 600px) {
    .container {
        border-radius: 0px;
    }
}
.blog-list {
    width: 100%;
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.blog-item {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.new-badge {
    padding-left: 8px;
    color: var(--color-destructive);
}
</style>

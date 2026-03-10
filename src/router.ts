import RootPage from '@/routes/RootPage.vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import BlogPage from './routes/BlogPage.vue';
import ReadPage from './routes/ReadPage.vue';

const routes: RouteRecordRaw[] = [
    {path: '/', component: RootPage},
    {path: '/blog', component: BlogPage},
    {path: '/blog/:postId', component: ReadPage},
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

import RootPage from '@/routes/RootPage.vue';
import {createMemoryHistory, createRouter, RouteRecordRaw} from 'vue-router';
import BlogPage from './routes/BlogPage.vue';
import ReadPage from './routes/ReadPage.vue';

const routes: RouteRecordRaw[] = [
    {path: '/', component: RootPage},
    {path: '/blog', component: BlogPage},
    {path: '/blog/:postId', component: ReadPage},
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

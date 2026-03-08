import RootPage from '@/routes/RootPage.vue';
import {createMemoryHistory, createRouter, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [{path: '/', component: RootPage}];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

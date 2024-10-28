import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue';
import Tasks from '@/components/TasksAll.vue';
import New from '@/components/NewTask.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },

    {
        path: '/tasks',
        component: Tasks,
    },

    {
        path: '/add',
        component: New,
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
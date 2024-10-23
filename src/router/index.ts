import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/pages/Dashboard.vue';
import Timesheet from '@/pages/Timesheet.vue';
import Login from '@/pages/Login.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/timesheet', component: Timesheet },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // Pass the routes array here
});

export default router;
export { routes }; // Export routes separately

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/pages/Dashboard.vue';
import TimeSheetIndex from '@/pages/TimeSheetIndex.vue';
import TimeSheetDetails from '@/pages/TimeSheetDetails.vue';
import Login from '@/pages/Login.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/timesheets', component: TimeSheetIndex },
  { path: '/timesheets/:id', name: 'TimeSheetDetails', component: TimeSheetDetails }, // Dynamic route with `id` parameter
];

const router = createRouter({
  history: createWebHistory(),
  routes, // Pass the routes array here
});

export default router;
export { routes }; // Export routes separately

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { routes } from './routes'
import SpinnerPage from '@/views/SpinnerPage.vue'
import TogglePage from '@/views/TogglePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

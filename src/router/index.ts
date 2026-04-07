import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tentang-kami',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true, layout: 'dashboard' },
    },
    {
      path: '/business-verification',
      name: 'business-verification',
      component: () => import('@/views/BusinessView.vue'),
      meta: { requiresAuth: true, layout: 'dashboard' },
    },
    {
      path: '/dashboard/new-business',
      name: 'new-business',
      component: () => import('@/views/BusinessForm.vue'),
      meta: { requiresAuth: true, layout: 'dashboard' },
    },
  ],
})

router.beforeEach(async (to) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    return '/login'
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    return '/dashboard'
  } else {
    return true
  }
})

export default router

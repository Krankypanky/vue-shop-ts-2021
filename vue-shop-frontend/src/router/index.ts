import {
  createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw,
} from 'vue-router';
import AuthService from '../services/AuthService';
import BookListing from '@/views/BookListing.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';

const userGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isAuthenticated = AuthService.isLoggedIn();

  if (isAuthenticated) {
    // allow to enter route
    next();
  } else {
    // go to '/login';
    next('/login');
  }
};

const redirectGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isAuthenticated = AuthService.isLoggedIn();

  if (isAuthenticated) {
    // allow to enter route
    next('/');
  } else {
    // go to '/login';
    next();
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BookListing,
    beforeEnter: userGuard,
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
    beforeEnter: redirectGuard,
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    beforeEnter: redirectGuard,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

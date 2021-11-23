import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BookListing from "../views/BookListing.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "BookListing",
    component: BookListing,
  },
  {
    path: "/login",
    name: "Login",
    component: BookListing,
  },
  {
    path: "/register",
    name: "Register",
    component: BookListing,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

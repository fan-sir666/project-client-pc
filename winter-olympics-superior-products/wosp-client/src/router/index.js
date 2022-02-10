import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/login/LoginPage";
import HomePage from "@/views/home/HomePage";
const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/login/LoginPage";
import HomePage from "@/views/home/HomePage";
import RegisterPage from "@/views/register/RegisterPage";
const routes = [
  // 登录
  {
    path: "/login",
    component: LoginPage,
  },
  // 注册
  {
    path: "/register",
    component: RegisterPage,
  },
  // 首页
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

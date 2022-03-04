import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";
const routes = [
  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/LoginPage"),
  },
  // 注册
  {
    path: "/register",
    component: () => import("@/views/register/RegisterPage"),
  },
  // 首页
  {
    path: "/",
    component: () => import("@/views/home/HomePage"),
  },
  // 分类
  {
    path: "/category/:id",
    component: () => import("@/views/category/CategoryPage"),
  },
  // 商品详情
  {
    path: "/goods/:id",
    component: () => import("@/views/goods/GoodsDetailPage"),
  },
  // 购物车
  {
    path: "/cart",
    component: () => import("@/views/cart/CartPage"),
  },
  // 结算
  {
    path: "/checkout/order",
    component: () => import("@/views/pay/CheckoutPage"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

// 检测用户是否登录(路由守卫)
router.beforeEach(authGuard);

export default router;

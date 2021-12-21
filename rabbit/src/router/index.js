import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";

const routes = [
  // 首页
  {
    path: "/",
    component: () => import("@/views/home/HomePage"),
  },
  // 一级分类
  {
    path: "/category/:id",
    component: () => import("@/views/category/TopCategoryPage"),
  },
  // 二级分类
  {
    path: "/category/sub/:id",
    component: () => import("@/views/category/SubcategoryPage"),
  },
  // 商品详情
  {
    path: "/goods/:id",
    component: () => import("@/views/goods/GoodsDetailPage"),
  },
  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/LoginPage"),
  },
  // 快捷登录
  {
    path: "/login/callback",
    component: () => import("@/views/login/LoginCallbackPage"),
  },
  //  购物车
  {
    path: "/cart",
    component: () => import("@/views/cart/cartPage"),
  },
  //  结算
  {
    path: "/checkout/order",
    component: () => import("@/views/pay/CheckoutPage"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 路由切换页面自动回到顶部
  scrollBehavior: () => ({ top: 0 }),
  routes,
});
// 检测用户是否登录
router.beforeEach(authGuard);

export default router;

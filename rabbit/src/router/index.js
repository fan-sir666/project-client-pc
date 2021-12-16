import { createRouter, createWebHashHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  // 路由切换页面自动回到顶部
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;

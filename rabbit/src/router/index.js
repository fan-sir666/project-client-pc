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
];

const router = createRouter({
  history: createWebHashHistory(),
  // 路由切换页面自动回到顶部
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;

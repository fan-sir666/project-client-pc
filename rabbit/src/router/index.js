import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 首页
  {
    path: "/",
    component: import("@/views/home/HomePage"),
  },
  // 首页
  {
    path: "/category/:id",
    component: import("@/views/category/TopCategoryPage"),
  },
  // 首页
  {
    path: "/category/sub/:id",
    component: import("@/views/category/SubcategoryPage"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createApp } from "vue";
import App from "./App.vue";
// 路由
import router from "./router";
// 统一管理状态vuex
import store from "./store";
// 重置样式库
import "normalize.css";
// 公共样式
import "@/assets/styles/common.less";

createApp(App).use(store).use(router).mount("#app");

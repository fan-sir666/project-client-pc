import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "@/assets/styles/common.less";
// 使用功能组件
import library from "@/components/library/index";

createApp(App).use(store).use(router).use(library).mount("#app");

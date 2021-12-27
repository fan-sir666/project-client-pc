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
// 使用插件
import library from "@/components/library/index";

// 判断当前是否为开发环境
if (process.env.NODE_ENV === "development") {
  // 动态引入请求拦截实例对象
  const worker = require("./mocks/worker").default;
  // 启动请求拦截实用程序
  // onUnhandledRequest: 拦截到但是未处理的请求走该函数
  // quiet: true 安静模式, 对于拦截成功的请求不要在控制台中进行输出提示
  worker
    .start({ onUnhandledRequest() {}, quiet: true })
    .then(() => console.log("%c拦截程序启动成功", "color: green"));
}
createApp(App).use(store).use(router).use(library).mount("#app");

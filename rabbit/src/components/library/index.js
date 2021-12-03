// 指令
import lazy from "@/components/directive/lazy";
// 设置全局属性
import Message from "@/components/library/Message";
// 批量注册组件
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();

export default {
  // 注册应用级全局组件
  install(app) {
    keys.forEach((item) => {
      //  导入组件
      const component = importFn(item).default;
      //  注册组件
      app.component(component.name, component);
    });
    //  图片懒加载指令
    app.directive("lazy", lazy);
    //  提示框
    app.config.globalProperties.$message = Message;
  },
};

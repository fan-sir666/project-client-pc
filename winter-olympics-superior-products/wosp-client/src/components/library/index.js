// 指令
import lazy from "@/components/directive/lazy";
// 组件
import Message from "@/components/library/Message";
// 批量注册组件
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();
export default {
  install(app) {
    //  遍历文件路径
    keys.forEach((key) => {
      // 导入组件
      const component = importFn(key).default;
      // 注册组件
      app.component(component.name, component);
    });
    //  图片懒加载指令
    app.directive("lazy", lazy);
    // 将Message方法添加到全局属性, 组件可通过实例对象进行访问
    app.config.globalProperties.$message = Message;
  },
};

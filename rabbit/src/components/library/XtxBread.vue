<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  // 渲染函数
  render() {
    // 获取 XtxBread 默认插槽内容
    const items = this.$slots.default();
    const children = [];
    // 变量items数组中的每一个虚拟DOM对象 , 处理渲染结构
    items.forEach((item, index) => {
      children.push(item);
      if (index < items.length - 1) {
        children.push(h("i", { className: "iconfont icon-angle-right" }));
      }
    });
    // 渲染面包屑
    return h("div", { className: "xtx-bread" }, children);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>

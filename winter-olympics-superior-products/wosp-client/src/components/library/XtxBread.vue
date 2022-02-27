<!-- 面包屑组件 -->
<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  render() {
    // 获取组件默认插槽内容, 获取 XtxBreadItem 组件
    const items = this.$slots.default();
    // 存储子组件内容, 因为 icon 需要动态生成
    const children = [];
    // 遍历插槽内容
    items.forEach((item, index) => {
      // 将当前遍历插槽内容存储起来
      children.push(item);
      // 如果当前不是最后一项, 动态生成 icon
      if (index < items.length - 1)
        children.push(h("i", { className: "iconfont icon-angle-right" }));
    });
    // 创建面包屑最外层元素
    return h("div", { className: "xtx-bread" }, children);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 14px;
    margin-left: 10px;
    margin-right: 10px;
    line-height: 24px;
  }
}
</style>

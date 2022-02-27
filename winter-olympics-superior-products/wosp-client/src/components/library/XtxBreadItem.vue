<!-- 面包屑单元 -->
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="path" :to="path"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
  </div>
</template>
<script>
export default {
  name: "XtxBreadItem",
  props: ["path"],
};
</script>
<style lang="less" scoped>
.xtx-bread-item {
  font-size: 18px;
  a {
    color: #666;
    transition: all 0.4s;
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>

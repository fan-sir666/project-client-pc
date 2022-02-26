<!-- 头部导航 -->
<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="categoryItem in category.list" :key="categoryItem.id">
      <router-link :to="`/category/${categoryItem.id}`">{{
        categoryItem.name
      }}</router-link>
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "AppHeaderNav",
  setup() {
    // 获取 store 对象
    const store = useStore();
    // 获取分类模块状态
    const category = store.state.category;
    // 返回组件所需状态
    return { category };
  },
};
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  > li {
    margin-right: 40px;
    > a {
      font-size: 18px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 2px solid @xtxColor;
      }
    }
  }
}
</style>

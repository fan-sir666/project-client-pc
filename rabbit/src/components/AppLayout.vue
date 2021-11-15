<template>
  <!--  布局组件 -->
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <slot></slot>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppTopNav from "@/components/AppTopNav";
import AppFooter from "@/components/AppFooter";
import AppHeaderSticky from "@/components/AppHeaderSticky";
import { useStore } from "vuex";
export default {
  name: "AppLayout",
  setup() {
    const store = useStore();
    //  发送请求过去分类数据
    store.dispatch("category/getCategories");
  },
  components: { AppFooter, AppTopNav, AppHeader, AppHeaderSticky },
};
</script>

<style scoped></style>

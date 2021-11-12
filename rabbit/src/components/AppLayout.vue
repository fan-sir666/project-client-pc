<template>
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <slot></slot>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppTopNav from "@/components/AppTopNav";
import AppFooter from "@/components/AppFooter";
import { useStore } from "vuex";
export default {
  name: "AppLayout",
  setup() {
    const store = useStore();
    //  发送请求过去分类数据
    store.dispatch("category/getCategories");
  },
  components: { AppFooter, AppTopNav, AppHeader },
};
</script>

<style scoped></style>

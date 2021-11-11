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
export default {
  name: "AppLayout",
  components: { AppFooter, AppTopNav, AppHeader },
};
</script>

<style scoped></style>

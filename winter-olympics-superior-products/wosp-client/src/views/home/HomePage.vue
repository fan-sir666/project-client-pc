<template>
  <AppLayout>
    <div class="container">
      <!-- 轮播图  -->
      <HomeBanner></HomeBanner>
      <!-- 新鲜好物 -->
      <HomeNew></HomeNew>
      <!-- 热销商品 -->
      <HomeBrand></HomeBrand>
      <!-- 参品区块  -->
      <HomeProduct></HomeProduct>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeBanner from "@/views/home/components/homeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeProduct from "@/views/home/components/HomeProduct";
export default {
  name: "HomePage",
  components: {
    AppLayout,
    HomeBanner,
    HomeNew,
    HomeBrand,
    HomeProduct,
  },
};
</script>

<style scoped></style>

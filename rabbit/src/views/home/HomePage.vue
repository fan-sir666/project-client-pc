<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew></HomeNew>
    <HomeHot></HomeHot>
    <HomeBrand></HomeBrand>
    <HomeProduct></HomeProduct>
    <HomeSpecial></HomeSpecial>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeProduct from "@/views/home/components/HomeProduct";
import HomeSpecial from "@/views/home/components/HomeSpecial";

export default {
  name: "HomePage",
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
};
</script>

<style scoped></style>

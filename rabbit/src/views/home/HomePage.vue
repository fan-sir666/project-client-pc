<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew></HomeNew>
    <HomeHot></HomeHot>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
export default {
  name: "HomePage",
  components: { AppLayout, HomeCategory, HomeBanner, HomeNew, HomeHot },
};
</script>

<style scoped></style>

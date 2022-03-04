<!-- 轮播图 -->
<template>
  <div class="home-banner">
    <XtxCarousel v-if="banners" :carousels="banners" :autoPlay="true" />
  </div>
</template>
<script>
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default {
  name: "HomeBanner",
  setup() {
    const banners = useBanners();
    return { banners };
  },
};
// 获取轮播图数据
function useBanners() {
  // 用于存储轮播图数据
  const banners = ref(null);
  // 获取轮播图数据
  getBanners().then(({ data }) => {
    // 存储轮播图数据
    banners.value = data;
  });
  // 返回轮播图数据
  return banners;
}
</script>

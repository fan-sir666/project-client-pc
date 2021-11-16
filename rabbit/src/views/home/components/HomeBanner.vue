<!-- 轮播图布局组件 -->
<template>
  <div class="home-banner">
    <XtxCarousel v-if="banners" :carousel="banners" :autoplay="true" />
  </div>
</template>
<script>
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default {
  name: "HomeBanner",
  setup() {
    const { banners, getData } = useBanners();
    getData();
    return { banners };
  },
};
function useBanners() {
  const banners = ref(null);
  //  获取轮播图数据
  const getData = async () => {
    try {
      const { result } = await getBanners();
      // console.log(result);
      banners.value = result;
    } catch (e) {
      throw new Error(e);
    }
  };
  return { banners, getData };
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>

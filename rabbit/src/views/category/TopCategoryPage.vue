<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="result?.id">{{ result?.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <XtxCarousel
        v-if="banners"
        :carousel="banners"
        :autoplay="true"
        :style="{ height: '500px' }"
      ></XtxCarousel>
      <ShowSubCategoryList
        v-if="result"
        :subCategories="result.children"
      ></ShowSubCategoryList>
      <RecommendGoods></RecommendGoods>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import useBanners from "@/hooks/useBanners";
import ShowSubCategoryList from "@/views/category/components/ShowSubCategoryList";
import RecommendGoods from "@/views/category/components/RecommendGoods";
export default {
  name: "TopCategoryPage",
  setup() {
    // 获取轮播图数据
    const { banners, getData } = useBanners();
    getData(2);
    return { result: useBread(), banners };
  },
  components: { ShowSubCategoryList, AppLayout, RecommendGoods },
};
// 获取面包屑数据
function useBread() {
  const store = useStore();
  const route = useRoute();
  return computed(() => {
    return store.state.category.list.find(
      (item) => item.id === route.params.id
    );
  });
}
</script>

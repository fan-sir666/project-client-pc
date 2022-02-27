<template>
  <AppLayout>
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category?.id">{{ category?.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图  -->
      <XtxCarousel></XtxCarousel>
      <!-- 商品列表展示  -->
      <ShowGoodsList></ShowGoodsList>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import ShowGoodsList from "@/views/category/components/ShowGoodsList";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "CategoryPage",
  setup() {
    return { category: useBread() };
  },
  components: { AppLayout, ShowGoodsList },
};
// 获取面包屑组件数据
function useBread() {
  // 获取路由信息对象
  const route = useRoute();
  // 获取 store 对象
  const store = useStore();
  // 获取当前访问的分类信息
  // 因为刚开始 category.list 里面只有 name 没有 id, 只有真实数据请求过来以后才有 id, 所以需要通过计算监控数据变化, 当数据发生变化后重新查找分类数据
  return computed(() => {
    return store.state.category.list.find(
      (category) => category.id == route.params.id
    );
  });
}
</script>

<style scoped></style>

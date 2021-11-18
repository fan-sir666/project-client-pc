<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem
          :key="result?.TopCategory?.id"
          :path="`/category/${result?.TopCategory?.id}`"
          >{{ result?.TopCategory?.name }}</XtxBreadItem
        >
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="result?.SubCategory?.id">{{
            result?.SubCategory?.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "SubCategoryPage",
  setup() {
    return { result: useBread() };
  },
  components: { AppLayout },
};
function useBread() {
  const store = useStore();
  const route = useRoute();
  return computed(() => {
    let TopCategory = null;
    let SubCategory = null;
    store.state.category.list.forEach((top) => {
      top.children?.forEach((sub) => {
        if (sub.id === route.params.id) {
          TopCategory = top;
          SubCategory = sub;
        }
      });
    });
    return { TopCategory, SubCategory };
  });
}
</script>

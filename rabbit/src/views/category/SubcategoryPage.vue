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
      <SubFilter @onFilterChanged="handleChange"></SubFilter>
      <XtxCheckbox v-model="test"></XtxCheckbox>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import SubFilter from "@/views/category/components/SubFilter";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import XtxCheckbox from "@/components/library/XtxCheckbox";
export default {
  name: "SubCategoryPage",
  setup() {
    const test = ref(false);
    // 接收筛选条件
    const handleChange = (obj) => {
      console.log(obj);
    };
    return { result: useBread(), handleChange, test };
  },
  components: { XtxCheckbox, AppLayout, SubFilter },
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

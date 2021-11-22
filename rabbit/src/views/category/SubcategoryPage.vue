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
      <SubFilter @onFilterChanged="onFilterSortChanged"></SubFilter>
      <div class="goods-list">
        <SubSort @onSortParamsChanged="onFilterSortChanged"></SubSort>
        <GoodsList :goods="goodsData?.items"></GoodsList>
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="loadMore"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import SubFilter from "@/views/category/components/SubFilter";
import SubSort from "@/views/category/components/SubSort";
import GoodsList from "@/views/category/components/GoodsList";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { getGoodsList } from "@/api/category";
export default {
  name: "SubCategoryPage",
  setup() {
    const { goodsData, onFilterSortChanged, loading, finished, loadMore } =
      useGoodsList();
    return {
      result: useBread(),
      goodsData,
      onFilterSortChanged,
      loading,
      finished,
      loadMore,
    };
  },
  components: { AppLayout, SubFilter, SubSort, GoodsList },
};
// 面包屑
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
// 商品列表
function useGoodsList() {
  // 存储请求数据
  const goodsData = ref(null);
  const route = useRoute();
  // 请求参数
  const reqParams = ref({ categoryId: route.params.id, page: 0, pageSize: 5 });
  // 加载状态
  const loading = ref(false);
  // 数据是否加载完毕
  const finished = ref(false);
  // 请求数据
  const getData = async () => {
    loading.value = true;
    const { result } = await getGoodsList(reqParams.value);
    // alert(reqParams.value.page);
    // goodsData.value = result;
    // 判断当前页是否为1,如果不为1 商品列表数据要累加
    if (reqParams.value.page === 1) {
      finished.value = false;
      goodsData.value = result;
    } else {
      goodsData.value = {
        ...result,
        items: [...goodsData.value.items, ...result.items],
      };
    }
    loading.value = false;
    //  如果当前页为最后一页改变finished的状态
    if (reqParams.value.page === result.pages || result.pages === 0) {
      finished.value = true;
    }
  };
  // 加载数据
  const loadMore = () => {
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };
  // 监听请求参数,重新获取数据
  watch(
    () => reqParams.value,
    () => {
      getData();
    }
    // {
    //   immediate: true,
    // }
  );

  // 路由更新,更新请求参数的分类id
  onBeforeRouteUpdate((to) => {
    reqParams.value = {
      ...reqParams.value,
      categoryId: to.params.id,
      page: 1,
    };
  });

  // 筛选条件和排序条件
  const onFilterSortChanged = (paramsVal) => {
    reqParams.value = {
      ...reqParams.value,
      ...paramsVal,
      page: 1,
    };
  };

  return { goodsData, onFilterSortChanged, loading, finished, loadMore };
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>

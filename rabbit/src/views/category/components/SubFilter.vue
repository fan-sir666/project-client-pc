<!-- 筛选区 -->
<template>
  <div v-if="filters && !filtersLoading" class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="item in filters?.brands"
          :key="item.id"
          :class="{ active: filters.selectedBrandId === item.id }"
          @click="
            filters.selectedBrandId = item.id;
            updateSelectedFilter();
          "
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filters?.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="property in item.properties"
          :key="property.id"
          :class="{ active: item.selectedFilterName === property.name }"
          @click="
            item.selectedFilterName = property.name;
            updateSelectedFilter();
          "
          >{{ property.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref } from "vue";
import { getSubCategoryFilterById } from "@/api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  name: "SubFilter",
  setup(props, { emit }) {
    const route = useRoute();
    const { filters, getData, updateSelectedFilter, filtersLoading } =
      useSubFilter(emit);
    getData(route.params.id);
    return { filters, updateSelectedFilter, filtersLoading };
  },
};
function useSubFilter(emit) {
  const filters = ref(null);
  const selectedFilter = {
    brandId: null,
    attrs: [],
  };
  const filtersLoading = ref(false);
  // 获取筛选数据
  const getData = async (id) => {
    try {
      // 更新筛选数据的加载状态
      filtersLoading.value = true;
      const { result } = await getSubCategoryFilterById(id);
      // 更新筛选数据的加载状态
      filtersLoading.value = false;
      // 处理数据
      result.brands.unshift({ id: null, name: "全部" });
      result.selectedBrandId = null;
      result.saleProperties.forEach((item) => {
        item.properties.unshift({ id: null, name: "全部" });
        item.selectedFilterName = "全部";
      });
      // 存储筛选条件
      filters.value = result;
    } catch (err) {
      throw new Error(err);
    }
  };
  // 汇总用户筛选条件
  const updateSelectedFilter = () => {
    // 选中的品牌Id
    selectedFilter.brandId = filters.value.selectedBrandId;
    // 先清除存储数组
    selectedFilter.attrs = [];
    // 选中的筛选条件
    filters.value.saleProperties.forEach((item) => {
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        selectedFilter.attrs.push({
          groupName: item.name,
          propertyName: item.selectedFilterName,
        });
      }
    });
    //  将收集好的条件传给父组件
    emit("onFilterChanged", selectedFilter);
  };
  // 监听路由变化
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { filters, getData, updateSelectedFilter, filtersLoading };
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>

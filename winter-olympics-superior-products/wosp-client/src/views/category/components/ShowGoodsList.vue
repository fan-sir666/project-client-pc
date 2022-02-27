<template>
  <div class="ref-goods">
    <div class="head">
      <h3>- 冬奥之城&nbsp;&nbsp;&nbsp;&nbsp;优质商品 -</h3>
    </div>
    <!--  商品列表  -->
    <div class="body">
      <GoodsItem
        v-for="item in goodsData?.list"
        :key="item.id"
        :goodsItem="item"
      />
    </div>
    <!-- 分页组件  -->
    <XtxPagination
      v-model:page="reqParams.page"
      :pageSize="reqParams.pageSize"
      :totalCount="goodsData?.totalCount"
      @update:page="updateReqParams({ page: $event })"
    ></XtxPagination>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { getCateGoryList } from "@/api/category";
export default {
  name: "ShowGoodsList",
  setup() {
    const { goodsData, reqParams, updateReqParams } = useGoodsList();
    return { goodsData, reqParams, updateReqParams };
  },
  components: { GoodsItem },
};
function useGoodsList() {
  const route = useRoute();
  // 存放分页数据
  const goodsData = ref();
  // 请求参数
  const reqParams = ref({
    id: route.params.id,
    page: 1,
    pageSize: 8,
  });
  // 更新请求参数
  const updateReqParams = (params) => {
    reqParams.value = {
      ...reqParams.value,
      ...params,
    };
  };
  // 获取数据
  const getData = async () => {
    getCateGoryList(reqParams.value).then(({ data }) => {
      goodsData.value = data;
    });
  };
  // 监听请求参数
  watch(
    () => reqParams.value,
    () => {
      getData();
    },
    { immediate: true, deep: true }
  );
  // 路由更新 更新请求参数 触发watch重新获取数据
  onBeforeRouteUpdate((to) => {
    updateReqParams({ id: to.params.id, page: 1, pageSize: 8 });
  });
  return { goodsData, reqParams, updateReqParams };
}
</script>

<style scoped lang="less">
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>

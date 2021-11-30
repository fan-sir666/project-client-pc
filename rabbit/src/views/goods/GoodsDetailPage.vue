<!-- 商品详情 -->
<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="result">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${result.categories[1].id}`">{{
            result.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem :path="`/category/sub/${result.categories[0].id}`">{{
            result.categories[0].name
          }}</XtxBreadItem>
          <XtxBreadItem>{{ result.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="result.mainPictures" />
            <GoodsSales></GoodsSales>
          </div>
          <!-- 右侧 1369155864430120962-->
          <div class="spec">
            <GoodsInfo :goods="result"></GoodsInfo>
            <GoodsSku
              :skus="result.skus"
              :specs="result.specs"
              @sendChangeData="sendChangeData"
            ></GoodsSku>
            <XtxNumberBox
              label="数量"
              :max="result.inventory"
              v-model="goodsCount"
            ></XtxNumberBox>
            <XtxButton type="primary" :style="{ 'margin-top': '20px' }"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="result.id"></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab></GoodsTab>
            <!-- 注意事项 -->
            <GoodsWarn></GoodsWarn>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1"></GoodsHot>
            <GoodsHot :type="2"></GoodsHot>
            <GoodsHot :type="3"></GoodsHot>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsHot from "@/views/goods/components/GoodsHot";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSku from "@/views/goods/components/GoodsSku";
import AppLayout from "@/components/AppLayout";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { provide, ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";
export default {
  name: "GoodsDetailPage",
  setup() {
    const goodsCount = ref(1);
    const { result, getData } = useGoods();
    getData();
    // 更新基本信息
    const sendChangeData = (data) => {
      result.value.price = data.price;
      result.value.oldPrice = data.oldPrice;
      result.value.inventory = data.inventory;
    };
    provide("goodsDetailData", result);
    return { result, sendChangeData, goodsCount };
  },
  components: {
    GoodsRelevant,
    AppLayout,
    GoodsImages,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
    GoodsTab,
    GoodsHot,
    GoodsWarn,
  },
};
function useGoods() {
  const route = useRoute();
  const result = ref(null);
  const getData = async () => {
    const { result: goodsData } = await getGoodsDetailById(route.params.id);
    // console.log(result);
    result.value = goodsData;
  };
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { result, getData };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

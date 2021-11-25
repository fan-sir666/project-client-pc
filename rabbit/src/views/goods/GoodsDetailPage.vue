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
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo :goods="result"></GoodsInfo>
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
            <!-- 注意事项 -->
            <div class="goods-warn"></div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import AppLayout from "@/components/AppLayout";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";
export default {
  name: "GoodsDetailPage",
  setup() {
    const { result, getData } = useGoods();
    getData();
    return { result };
  },
  components: { GoodsRelevant, AppLayout, GoodsImages, GoodsSales, GoodsInfo },
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

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
            <GoodsSku
              :skus="result.skus"
              :specs="result.specs"
              @sendChangeData="sendChangeData"
              @sendClearSkuId="result.currentSelectedSkuId = null"
            ></GoodsSku>
            <XtxNumberBox
              label="数量"
              :max="result.inventory"
              v-model="goodsCount"
            ></XtxNumberBox>
            <XtxButton
              type="primary"
              :style="{ 'margin-top': '20px' }"
              @click="addGoodsToCart"
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
import Message from "@/components/library/Message";
import { useStore } from "vuex";
export default {
  name: "GoodsDetailPage",
  setup() {
    const store = useStore();
    const route = useRoute();
    // 添加购物车商品数量
    const goodsCount = ref(1);
    // 商品详情信息
    const { result, getData } = useGoods();
    getData(route.params.id);
    // 更新基本信息
    const sendChangeData = (data) => {
      result.value.price = data.price;
      result.value.oldPrice = data.oldPrice;
      result.value.inventory = data.inventory;
      result.value.currentSelectedSkuId = data.skuId;
      result.value.currentSelectedSkuText = data.specsText;
    };
    // 加入购物车
    const addGoodsToCart = () => {
      // console.log(result.value.currentSelectedSkuId);
      // 判断用户是否选择了规格
      if (!result.value.currentSelectedSkuId) {
        return Message({ type: "warn", text: "请选择商品规格" });
      }
      // 购物车商品信息
      const goods = {
        // 商品id
        id: result.value.id,
        // 商品 skuId
        skuId: result.value.currentSelectedSkuId,
        // 商品名称
        name: result.value.name,
        // 商品规格属性文字
        attrsText: result.value.currentSelectedSkuText,
        // 商品图片
        picture: result.value.mainPictures[0],
        // 商品原价
        price: result.value.oldPrice,
        // 商品现价
        nowPrice: result.value.price,
        // 是否选中
        selected: true,
        // 商品库存
        stock: result.value.inventory,
        // 用户选择的商品数量
        count: goodsCount.value,
        // 如果用户选择了规格, 该商品就一定是有效商品, 因为能够选择的规格都是有库存的
        isEffective: true,
      };
      // console.log(goods);
      // 添加购物车
      store.dispatch("cart/addGoodsToCart", goods).then(
        () => {
          Message({ type: "success", text: "商品添加成功" });
        },
        () => {
          Message({ type: "warn", text: "商品添加失败" });
        }
      );
    };
    // 向下提供商品详情信息
    provide("goodsDetailData", result);
    return { result, sendChangeData, goodsCount, addGoodsToCart };
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
  const result = ref(null);
  const getData = async (id) => {
    const { result: goodsData } = await getGoodsDetailById(id);
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

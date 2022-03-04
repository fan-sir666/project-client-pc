<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="result">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${result.categories.cate_id}`">{{
            result.categories.name
          }}</XtxBreadItem>
          <XtxBreadItem>{{ result.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="result.mainpictures" />
            <GoodsSales></GoodsSales>
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo></GoodsInfo>
            <div class="purchase">
              <XtxNumberBox
                label="数量"
                :max="Number(result.inventory)"
                v-model="count"
              />
              <XtxButton
                type="primary"
                :style="{ 'margin-top': '20px' }"
                @click="addCart"
                >加入购物车</XtxButton
              >
            </div>
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :reqParams="result"></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品效果 细节 -->
            <div class="goods-tabs">
              <GoodsDetail></GoodsDetail>
            </div>
            <!-- 注意事项 -->
            <div class="goods-warn">
              <GoodsWarn></GoodsWarn>
            </div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot></GoodsHot>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsDetail from "@/views/goods/components/GoodsDetail";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import GoodsHot from "@/views/goods/components/GoodsHot";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { provide, ref } from "vue";
import { getGoodsDetail } from "@/api/goods";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { addGoodsCart } from "@/api/cart";
export default {
  name: "GoodsDetailPage",
  setup() {
    // 获取 store 对象
    const store = useStore();
    const router = useRouter();
    // 获取商品信息数据
    const result = useGoods();
    // 向下提供商品详情信息
    provide("goodsDetailData", result);
    // 存储用户选择的商品数量
    const count = ref(1);
    // 加入购物车
    const addCart = () => {
      // 添加商品信息
      const goods = {
        // 商品id
        id: result.value.id,
        // 用户选择的商品数量
        count: count.value,
        // 是否选中
        selected: true,
        // 商品图片
        picture: result.value.mainpictures.smallImgArr[0],
      };
      // 判断用户是否登录
      if (!store.state.user.profile.token) {
        //  未登录 跳转登录页
        Message({ type: "warn", text: "亲,请登录" });
        router.push("/login");
      } else {
        //  已登录
        addGoodsCart(goods).then(({ data }) => {
          // 是否超出库存
          if (data.type) {
            Message({ type: "warn", text: data.msg });
          } else {
            Message({ type: "success", text: data.msg });
            router.push({
              path: "/cart",
              query: { goodsId: result.value.id, cateId: result.value.cate_id },
            });
          }
        });
      }
    };
    return { result, count, addCart };
  },
  components: {
    AppLayout,
    GoodsRelevant,
    GoodsImages,
    GoodsSales,
    GoodsInfo,
    GoodsDetail,
    GoodsWarn,
    GoodsHot,
  },
};
function useGoods() {
  // 获取路由信息对象
  const route = useRoute();
  // 用于存储商品详情信息
  const result = ref(null);
  // 用于获取商品详情信息
  const getGoodsData = (id) => {
    // 发送请求获取商品详情信息
    getGoodsDetail(id).then(({ data }) => {
      // console.log(data);
      result.value = data;
    });
  };
  // 初始获取商品详情信息
  getGoodsData(route.params.id);
  // 路由变化重新获取数据
  onBeforeRouteUpdate((to) => getGoodsData(to.params.id));
  return result;
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
    width: 660px;
    padding: 30px 30px 30px 0;
    .purchase {
      display: flex;
      height: 190px;
      flex-direction: column;
      justify-content: space-around;
    }
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

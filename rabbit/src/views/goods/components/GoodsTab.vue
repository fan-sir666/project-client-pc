<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:"
        :class="{ active: activeComponentName === 'GoodsDetail' }"
        @click="activeComponentName = 'GoodsDetail'"
        >商品详情</a
      >
      <a
        href="javascript:"
        :class="{ active: activeComponentName === 'GoodsComment' }"
        @click="activeComponentName = 'GoodsComment'"
        >商品评价<span>({{ goodsDetailData.commentCount }})</span></a
      >
    </nav>
    <!-- 根据组件名称动态渲染组件 -->
    <keep-alive>
      <component :is="activeComponentName"></component>
    </keep-alive>
  </div>
</template>
<script>
import { inject, ref } from "vue";
import GoodsDetail from "@/views/goods/components/GoodsDetail";
import GoodsComment from "@/views/goods/components/GoodsComment";
export default {
  name: "GoodsTab",
  setup() {
    const activeComponentName = ref("GoodsDetail");
    const goodsDetailData = inject("goodsDetailData");
    return { activeComponentName, goodsDetailData };
  },
  components: { GoodsDetail, GoodsComment },
};
</script>
<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>

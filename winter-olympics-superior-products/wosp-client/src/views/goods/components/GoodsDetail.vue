<!-- 商品详情 -->
<template>
  <div class="goods-detail">
    <div class="header">
      <i class="icon"></i>
      <span class="title">商品介绍 | 参品细节 | 货物来源</span>
    </div>
    <!-- 图片 -->
    <img :src="item" v-for="(item, i) in result.detailpictures" :key="i" />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "GoodsDetail",
  setup() {
    const result = inject("goodsDetailData");
    return { result };
  },
};
</script>

<style scoped lang="less">
.goods-detail {
  .header {
    height: 80px;
    line-height: 80px;
    text-align: left;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  padding: 40px;
  > img {
    width: 100%;
  }
}
</style>

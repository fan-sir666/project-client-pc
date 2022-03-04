<!-- 热榜组件 -->
<template>
  <div class="goods-hot">
    <h3>24小时热榜</h3>
    <div>
      <GoodsItem
        v-for="goods in hotGoods"
        :key="goods.id"
        :goodsItem="goods"
      ></GoodsItem>
    </div>
  </div>
</template>
<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref } from "vue";
import { getHotGoods } from "@/api/goods";

export default {
  name: "GoodsHot",
  setup() {
    const hotGoods = ref();
    // 用于获取热销商品数据
    getHotGoods().then(({ data }) => {
      // 存储热销商品数据
      hotGoods.value = data;
    });
    return { hotGoods };
  },
  components: { GoodsItem },
};
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>

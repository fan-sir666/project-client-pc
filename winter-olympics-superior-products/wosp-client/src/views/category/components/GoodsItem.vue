<template>
  <RouterLink :to="goodsItem.hrefUrl" class="goods-item">
    <img :src="goodsItem.imgUrl" alt="" />
    <p class="name ellipsis">{{ goodsItem.name }}</p>
    <p class="desc ellipsis">{{ goodsItem.desc }}</p>
    <p class="price">&yen;{{ goodsItem.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: "GoodsItem",
  props: ["goodsItem"],
};
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  margin: 6px 28px;
  padding: 26px 20px;
  text-align: center;
  transition: all 0.5s;
  .hoverShadow();

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>

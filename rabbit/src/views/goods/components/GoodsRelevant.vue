<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel
      v-if="carousels.length > 0"
      :carousel="carousels"
      :autoplay="true"
    />
  </div>
</template>

<script>
import { getRelevantGoods } from "@/api/goods";
import { ref } from "vue";

export default {
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
    },
  },
  setup(props) {
    const { carousels, getData } = useRelativeGoods(props.goodsId);
    // 放请求获取数据
    getData();
    return { carousels };
  },
};
function useRelativeGoods(goodsId) {
  // 存放处理好的轮播图数据
  const carousels = ref([]);
  const getData = async () => {
    const { result } = await getRelevantGoods({ id: goodsId });
    //  处理数据
    const size = 4;
    const total = Math.ceil(result.length / size);
    for (let i = 0; i < total; i++) {
      carousels.value.push(result.slice(i * size, i * size + size));
    }
  };
  return { carousels, getData };
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
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
}
.goods-relevant {
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>

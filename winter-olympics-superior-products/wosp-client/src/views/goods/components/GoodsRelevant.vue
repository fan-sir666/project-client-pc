<!-- 同类商品||猜你喜欢 -->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel v-if="carousels" :carousels="carousels" />
  </div>
</template>

<script>
import { getGoodsRecommend } from "@/api/goods";
import { ref, watch } from "vue";
export default {
  name: "GoodsRelevant",
  props: {
    reqParams: {
      type: Object,
    },
  },
  setup(props) {
    const { carousels, getData } = useRelativeGoods();
    // 参数发送变化 setup 不会重新执行  watch 重新获取数据
    watch(
      () => props.reqParams,
      () => {
        getData(props.reqParams.id, props.reqParams.cate_id);
      },
      {
        immediate: true,
      }
    );
    return { carousels };
  },
};
function useRelativeGoods() {
  // 轮播图需要的数据结构 [[{}],[{}],[{}]]
  const carousels = ref([]);
  const getData = (id, catId) => {
    // 发送请求获取数据
    getGoodsRecommend(id, catId).then(({ data }) => {
      // 每页显示4条数据
      const size = 4;
      // 只有计算出了一共有多少页, 才能知道循环多少次才能将数据拆分完成
      const total = Math.ceil(data.length / size);
      // 组织数据结构
      carousels.value = []; // 重置数据
      for (let i = 0; i < total; i++) {
        // 第一页: 0-3 第二页: 4-7 第三页: 8-11
        // 从哪开始取: i*size
        // 取到哪 i*size + size, 由于 slice 方法在截取时不包含第二个参数位置的元素, 所以是 + size, 不是 + size - 1
        carousels.value.push(data.slice(i * size, i * size + size));
      }
    });
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
    line-height: 130px;
    padding: 0 20px;
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
}
</style>

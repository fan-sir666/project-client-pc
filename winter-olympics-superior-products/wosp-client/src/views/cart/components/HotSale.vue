<!-- 猜你喜欢 -->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">猜你喜欢</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel v-if="carousels" :carousels="carousels" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getCartHotSale } from "@/api/cart";

export default {
  name: "HotSale",
  setup() {
    const carousels = ref();
    const getData = async () => {
      const { data } = await getCartHotSale();
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
    };
    getData();
    return { carousels };
  },
};
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

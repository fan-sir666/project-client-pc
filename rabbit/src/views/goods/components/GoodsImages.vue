<template>
  <div class="goods-image">
    <!-- 图片预览放大容器 -->
    <div
      class="large"
      v-show="show"
      :style="{
        backgroundImage: `url(${images[curIndex]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
    ></div>
    <div class="middle" ref="middleElement">
      <!-- 放大镜 -->
      <div
        class="layer"
        v-show="show"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
      ></div>
      <img :src="images[curIndex]" alt="" />
    </div>
    <ul class="small">
      <li
        :class="{ active: curIndex === index }"
        v-for="(item, index) in images"
        :key="index"
        @mouseenter="curIndex = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 预览图片的当前索引
    const curIndex = ref(0);
    // 是否显示放大镜和放大容器
    const show = ref(false);
    // 放大镜活动容器
    const middleElement = ref(null);
    const { isOutside, elementX, elementY } = useMouseInElement(middleElement);
    const layerPosition = ref({ left: 0, top: 0 });
    const bgPosition = ref({ x: 0, y: 0 });
    // 监听是否移除元素和鼠标坐标变化
    watch([isOutside, elementX, elementY], () => {
      //  isOutside: true移出 false 移入
      show.value = !isOutside.value;
      //  让鼠标显示在放大镜的中心
      layerPosition.value = {
        left: elementX.value - 100,
        top: elementY.value - 100,
      };
      //  放大镜移动水平限制
      if (layerPosition.value.left < 0) {
        layerPosition.value.left = 0;
      } else if (layerPosition.value.left > 200) {
        layerPosition.value.left = 200;
      }
      //  放大镜移动垂直限制
      if (layerPosition.value.top < 0) {
        layerPosition.value.top = 0;
      } else if (layerPosition.value.top > 200) {
        layerPosition.value.top = 200;
      }
      //  放大图片移动
      bgPosition.value = {
        x: -layerPosition.value.left * 2,
        y: -layerPosition.value.top * 2,
      };
    });
    return { curIndex, show, middleElement, layerPosition, bgPosition };
  },
};
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>

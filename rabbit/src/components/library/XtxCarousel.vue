<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: index === curIndex }"
        v-for="(item, index) in carousel"
        :key="item.id"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:" class="carousel-btn prev" @click="toggle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:" class="carousel-btn next" @click="toggle(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        :class="{ active: index === curIndex }"
        v-for="(item, index) in carousel"
        :key="item.id"
        @click="curIndex = index"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "XtxCarousel",
  props: {
    // 轮播图数据
    carousel: {
      type: Array,
    },
    //  自动轮播
    autoplay: {
      type: Boolean,
      default: false,
    },
    //  轮播时间
    duration: {
      type: Number,
      default: 1500,
    },
  },
  setup(props) {
    // 当前索引
    const curIndex = ref(0);
    // 定时器id
    const timeId = ref(null);
    // 点击按钮切换图片
    const toggle = (step = 1) => {
      // console.log(step);
      // 变化索引
      const changeIndex = curIndex.value + step;
      if (changeIndex < 0) {
        curIndex.value = props.carousel.length - 1;
      } else if (changeIndex > props.carousel.length - 1) {
        curIndex.value = 0;
      } else {
        curIndex.value = changeIndex;
      }
    };
    // 开启轮播
    const start = () => {
      if (props.autoplay && props.carousel.length > 1) {
        timeId.value = setInterval(toggle, props.duration);
      }
    };
    // 停止轮播
    const stop = () => {
      clearInterval(timeId.value);
    };
    onMounted(start);
    onUnmounted(stop);
    return { curIndex, toggle, start, stop };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>

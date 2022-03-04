<!-- 轮播图 -->
<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: index === currentIndex }"
        v-for="(item, index) in carousels"
        :key="item.id"
      >
        <!-- 如果 item 是数组就表示当前遍历的同类商品数据 -->
        <div class="slider" v-if="Array.isArray(item)">
          <router-link
            v-for="goods in item"
            :key="goods.goods_id"
            :to="goods.hrefUrl"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </router-link>
        </div>
        <RouterLink :to="item.hrefUrl" v-else>
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
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in carousels"
        :key="item.id"
        @click="currentIndex = index"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "XtxCarousel",
  props: {
    carousels: {
      type: Array,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  setup(props) {
    // 当前索引
    const currentIndex = ref(0);
    // 图片切换
    const toggle = (step = 1) => {
      // 计算索引
      const nextIndex = currentIndex.value + step;
      // 如果索引值小于了第一张图片的索引
      if (nextIndex < 0) {
        // 让索引值为最后一张图片的索引
        currentIndex.value = props.carousels.length - 1;
        // 如果索引值大于了最后一张图片的索引
      } else if (nextIndex > props.carousels.length - 1) {
        // 让索引值为第一张图片的索引
        currentIndex.value = 0;
      } else {
        // 索引值范围正常
        currentIndex.value = nextIndex;
      }
    };
    // 自动轮播
    const timer = ref(null);
    // 开启
    const start = () => {
      if (props.autoPlay && props.carousels.length > 1) {
        timer.value = setInterval(toggle, props.duration);
      }
    };
    // 停止
    const stop = () => {
      clearInterval(timer.value);
    };
    // 组件挂载完成后试图开启自动轮播
    onMounted(start);
    // 组件卸载之后停止自动轮播
    onUnmounted(stop);
    return { currentIndex, toggle, start, stop };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 1240px;
  height: 500px;
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
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 60px 40px 0;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: @priceColor;
            margin-top: 15px;
          }
        }
      }
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
          background: #f5f5f5;
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

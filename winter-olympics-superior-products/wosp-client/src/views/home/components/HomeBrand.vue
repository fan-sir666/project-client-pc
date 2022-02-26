<!-- 热销商品 -->
<template>
  <HomePanel title="热销商品" subTitle="冰雪山城 品质保证" ref="target">
    <template v-slot:right>
      <div class="toggle-btn">
        <a
          href="javascript:"
          class="iconfont icon-angle-left prev"
          :class="{ disabled: curIndex === 0 }"
          @click="toggle(-1)"
        ></a>
        <a
          href="javascript:"
          class="iconfont icon-angle-right next"
          :class="{ disabled: curIndex === 1 }"
          @click="toggle(1)"
        ></a>
      </div>
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          class="list"
          v-if="result"
          :style="{ transform: `translateX(${-curIndex * 1240}px)` }"
        >
          <li v-for="item in result" :key="item.id">
            <RouterLink :to="item.hrefUrl">
              <img :src="item.imgUrl" />
            </RouterLink>
          </li>
        </ul>
        <Transition name="fade">
          <div v-if="!result" class="skeleton">
            <XtxSkeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated="scroll"
              bg="#e4e4e4"
              width="240px"
              height="305px"
            /></div
        ></Transition>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import useLazyData from "@/hooks/useLazyData";
import { getHotGoods } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeBrand",
  setup() {
    const { target, result } = useLazyData(getHotGoods);
    return { target, result, ...useToggle() };
  },
  components: { HomePanel },
};
// 点击切换
function useToggle() {
  const curIndex = ref(0);
  const toggle = (step) => {
    const changeIndex = curIndex.value + step;
    if (changeIndex < 0 || changeIndex > 1) return;
    curIndex.value = changeIndex;
  };
  return { curIndex, toggle };
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
  .toggle-btn {
    margin-right: 16px;
  }
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    ~ .item {
      margin-left: 10px;
    }
  }
}
</style>

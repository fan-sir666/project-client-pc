<!-- 热门品牌组件 -->
<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
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
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          class="list"
          v-if="result"
          :style="{ transform: `translateX(${-curIndex * 1240}px)` }"
        >
          <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" :alt="item.name" />
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
import { getHotBrands } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeBrand",
  setup() {
    // 懒加载获取数据
    const { target, result } = useLazyData(() => getHotBrands(10));
    // 点击切换内容
    // const { curIndex, toggle } = useToggle();
    return { target, result, ...useToggle() };
  },
  components: { HomePanel },
};
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

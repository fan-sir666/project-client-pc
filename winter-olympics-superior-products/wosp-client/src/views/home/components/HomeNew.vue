<!-- 新鲜好物 -->
<template>
  <HomePanel title="新鲜好物" subTitle="营养丰富 致力健康" ref="target">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul className="goods-list" v-if="goods">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="item.hrefUrl">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <Transition name="fade">
        <HomeSkeleton v-if="!goods"></HomeSkeleton>
      </Transition>
    </template>
  </HomePanel>
</template>
<script>
import HomePanel from "@/views/home/components/HomePanel";
import HomeSkeleton from "@/views/home/components/HomeSkeleton";
import { getNewGoods } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";

export default {
  name: "HomeNew",
  setup() {
    // 使用数据懒加载获取数据
    const { target, result } = useLazyData(getNewGoods);
    return { goods: result, target };
  },
  components: { HomePanel, HomeSkeleton },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
.home-skeleton {
  top: 115px;
}
</style>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #default>
      <ul class="goods-list" v-if="goods">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.title" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import { ref } from "vue";
import { getHomeHot } from "@/api/home";
export default {
  name: "HomeHot",
  setup() {
    const { goods, getData } = useHotGoods();
    getData();
    return { goods };
  },
  components: { HomePanel },
};
function useHotGoods() {
  const goods = ref();
  const getData = async () => {
    try {
      const { result } = await getHomeHot();
      // console.log(result);
      goods.value = result;
    } catch (e) {
      throw new Error(e);
    }
  };
  return { goods, getData };
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>

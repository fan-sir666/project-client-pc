<!-- 热榜组件 -->
<template>
  <div class="goods-hot" v-if="hotGoods">
    <h3>{{ typeName }}</h3>
    <GoodsItem
      v-for="item in hotGoods"
      :key="item.id"
      :goodsItem="item"
    ></GoodsItem>
  </div>
</template>
<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getHotGoodsApi } from "@/api/goods";
export default {
  name: "GoodsHot",
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const { hotGoods, typeName } = useHotGoods(props.type);
    return { hotGoods, typeName };
  },
  components: { GoodsItem },
};
function useHotGoods(type) {
  const route = useRoute();
  // 存放热榜数据
  const hotGoods = ref();
  // 热榜标题
  const names = ref({ 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" });
  // 获取数据
  const getData = async (id) => {
    const { result } = await getHotGoodsApi({ id, type });
    hotGoods.value = result;
  };
  getData(route.params.id);
  return { hotGoods, typeName: names.value[type] };
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>

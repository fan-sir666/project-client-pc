<!-- 一级分类全部分类的品牌推荐 -->
<template>
  <div class="ref-goods" v-for="item in topCategory?.children" :key="item.id">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem
        :goodsItem="goodsItem"
        v-for="goodsItem in item?.goods"
        :key="goodsItem.id"
      />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getTopCategoryById } from "@/api/category";
export default {
  name: "RecommendGoods",
  setup() {
    const route = useRoute();
    const { topCategory, getData } = useTopCategory();
    getData(route.params.id);
    return { topCategory };
  },
  components: { GoodsItem },
};
function useTopCategory() {
  const topCategory = ref(null);
  //   请求数据
  const getData = async (id) => {
    try {
      const { result } = await getTopCategoryById(id);
      topCategory.value = result;
    } catch (err) {
      throw new Error(err);
    }
  };
  // 路由切换组件没有重新渲染，setup不会再次执行数据没有跟新
  // 路由切换重新获取数据
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { topCategory, getData };
}
</script>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>

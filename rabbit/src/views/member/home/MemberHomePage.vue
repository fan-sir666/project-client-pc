<template>
  <AppMemberLayout>
    <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="我的收藏" v-if="collection">
        <GoodsItem
          v-for="goods in collection.items"
          :key="goods.id"
          :goodsItem="goods"
        />
      </MemberHomePanel>
      <MemberHomePanel title="我的足迹"></MemberHomePanel>
      <GoodsRelevant />
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import MemberHomeOverview from "@/views/member/home/components/MemberHomeOverview";
import MemberHomePanel from "@/views/member/home/components/MemberHomePanel";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref } from "vue";
import { getCollection } from "@/api/member";
export default {
  name: "MemberHomePage",
  setup() {
    // 收藏数据
    const collection = ref();
    getCollection({ pageSize: 4 }).then((data) => {
      collection.value = data.result;
    });
    return { collection };
  },
  components: {
    AppMemberLayout,
    MemberHomeOverview,
    MemberHomePanel,
    GoodsRelevant,
    GoodsItem,
  },
};
</script>
<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>

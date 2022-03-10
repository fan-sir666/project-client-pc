<template>
  <AppLayout
    ><div class="xtx-order-detail-page">
      <div class="container">
        <DetailAction v-if="orderInfo" :orderInfo="orderInfo"></DetailAction>
        <DetailOrderGoods
          v-if="orderInfo"
          :orderInfo="orderInfo"
        ></DetailOrderGoods>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import DetailAction from "@/views/member/components/DetailAction";
import DetailOrderGoods from "@/views/member/components/DetailOrderGooods";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { inquireOrder } from "@/api/order";
export default {
  name: "OrderDetailPage",
  setup() {
    const route = useRoute();
    // 获取路由参数
    const id = route.params.id;
    const { orderInfo } = getOrderDetail(id);
    return { orderInfo };
  },
  components: { AppLayout, DetailAction, DetailOrderGoods },
};
// 获取订单详情数据
function getOrderDetail(id) {
  // 存储订单信息
  const orderInfo = ref();
  const getData = async () => {
    const { data } = await inquireOrder(id);
    orderInfo.value = data;
  };
  getData();
  return { orderInfo };
}
</script>

<style scoped lang="less">
.xtx-order-detail-page {
  margin-top: 20px;
  > .container {
    background-color: #ffffff;
  }
}
</style>

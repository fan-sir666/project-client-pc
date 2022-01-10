<!-- 订单详情 -->
<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction
        v-if="orderDetail"
        :orderDetail="orderDetail"
        @onOrderListReload="getData($event)"
      ></DetailAction>
      <!-- 步骤条-->
      <XtxSteps
        v-if="orderDetail"
        :active="orderDetail.orderState === 6 ? 1 : orderDetail.orderState"
      >
        <XtxStepItem
          title="提交订单"
          :desc="orderDetail.createTime"
        ></XtxStepItem>
        <XtxStepItem title="付款成功" :desc="orderDetail.payTime"></XtxStepItem>
        <XtxStepItem
          title="商品发货"
          :desc="orderDetail.consignTime"
        ></XtxStepItem>
        <XtxStepItem title="确认收货" :desc="orderDetail.endTime"></XtxStepItem>
        <XtxStepItem
          title="订单完成"
          :desc="orderDetail.evaluationTime"
        ></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏 Suspense确保异步setup同步执行 -->
      <template v-if="orderDetail">
        <Suspense>
          <DetailLogistics
            v-if="[3, 4, 5].includes(orderDetail.orderState)"
          ></DetailLogistics>
        </Suspense>
      </template>
      <!-- 订单商品信息 -->
      <DetailOrderGoods
        v-if="orderDetail"
        :orderDetail="orderDetail"
      ></DetailOrderGoods>
    </div>
  </AppMemberLayout>
</template>
<script>
import DetailOrderGoods from "@/views/member/order/components/DetailOrderGoods";
import DetailAction from "@/views/member/order/components/DetailAction";
import DetailLogistics from "@/views/member/order/components/DetailLogistics";
import AppMemberLayout from "@/components/AppMemberLayout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderInfo } from "@/api/order";
export default {
  name: "OrderDetailPage",
  setup() {
    const { orderDetail, getData } = useOrderDetail();
    return { orderDetail, getData };
  },
  components: {
    AppMemberLayout,
    DetailAction,
    DetailLogistics,
    DetailOrderGoods,
  },
};
function useOrderDetail() {
  const route = useRoute();
  // 存储订单详情
  const orderDetail = ref();
  const getData = async (id) => {
    const { result } = await getOrderInfo(id);
    orderDetail.value = result;
  };
  getData(route.params.id);
  return { orderDetail, getData };
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>

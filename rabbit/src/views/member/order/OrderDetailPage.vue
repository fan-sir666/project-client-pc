<!-- 订单详情 -->
<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction
        v-if="orderDetail"
        :orderDetail="orderDetail"
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
      <Suspense>
        <DetailLogistics></DetailLogistics>
      </Suspense>
      <!-- 订单商品信息 -->
    </div>
  </AppMemberLayout>
</template>
<script>
import DetailAction from "@/views/member/order/components/DetailAction";
import DetailLogistics from "@/views/member/order/components/DetailLogistics";
import AppMemberLayout from "@/components/AppMemberLayout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderInfo } from "@/api/order";
export default {
  name: "OrderDetailPage",
  setup() {
    const { orderDetail } = useOrderDetail();
    return { orderDetail };
  },
  components: { AppMemberLayout, DetailAction, DetailLogistics },
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
  return { orderDetail };
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>

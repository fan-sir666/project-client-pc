<!-- 订单详情物流信息 -->
<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{ logistics.list[0].text }}</span>
      <span>{{ logistics.list[0].time }}</span>
    </p>
    <a href="javascript:" @click="lookLogistics">查看物流</a>
  </div>
  <!-- 查看物流信息 -->
  <teleport to="#modal">
    <OrderLogistics ref="orderLogisticsInstance" />
  </teleport>
</template>
<script>
import OrderLogistics from "@/views/member/order/components/OrderLogistics";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getLogisticsOrder } from "@/api/member";

export default {
  name: "DetailLogistics",
  async setup() {
    const route = useRoute();
    // 存储物流信息
    const logistics = ref(null);
    const { result } = await getLogisticsOrder(route.params.id);
    logistics.value = result;
    // 存储物流信息弹层组件实例对象
    const orderLogisticsInstance = ref();
    // 查看物流
    const lookLogistics = () => {
      orderLogisticsInstance.value.visible = true;
      orderLogisticsInstance.value.id = route.params.id;
    };
    return { logistics, orderLogisticsInstance, lookLogistics };
  },
  components: { OrderLogistics },
};
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>

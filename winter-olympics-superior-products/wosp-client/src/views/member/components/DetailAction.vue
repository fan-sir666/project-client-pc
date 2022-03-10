<!-- 订单详情头部 -->
<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[orderInfo.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderInfo.id }}</p>
      <p>
        下单时间：{{
          dayjs(orderInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
        }}
      </p>
    </div>
    <div class="btn" v-if="orderInfo.orderState === 6">
      <XtxButton type="primary" size="small" @click="removeOrder(orderInfo.id)"
        >删除订单</XtxButton
      >
    </div>
  </div>
</template>
<script>
import { orderStatus } from "@/api/constants";
import dayjs from "dayjs";
import { delOrder } from "@/api/order";
import Message from "@/components/library/Message";
import { useRouter } from "vue-router";
export default {
  name: "DetailAction",
  props: ["orderInfo"],
  setup() {
    const router = useRouter();
    const removeOrder = (id) => {
      delOrder(id).then(({ code }) => {
        if (code == 200) {
          Message({ type: "success", text: "订单删除成功!" });
          router.push("/");
        } else {
          Message({ type: "warn", text: "订单删除失败!" });
        }
      });
    };
    return { orderStatus, dayjs, removeOrder };
  },
};
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    text-align: left;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>

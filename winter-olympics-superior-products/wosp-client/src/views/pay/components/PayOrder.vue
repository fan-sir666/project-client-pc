<!-- 支付对话框 -->
<template>
  <XtxDialog v-model:visible="visible" ref="xtxDialogInstance" title="支付">
    <template v-slot:default>
      <div class="pay-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">订单编号：</div>
            <span>{{ orderInfo.id }}</span>
          </div>
          <div class="xtx-form-item">
            <div class="label">支付金额：</div>
            <span>¥{{ Number(orderInfo.payMoney).toFixed(2) }}</span>
          </div>
          <div class="xtx-form-item">
            <div class="label">支付密码：</div>
            <div class="pay-box">
              <input
                type="tel"
                class="pay_value"
                v-model="payCode"
                maxlength="6"
                @keyup="getNum"
                @keydown="delNum"
              />
              <div class="pay_value_box">
                <input
                  type="password"
                  maxlength="1"
                  v-for="(item, index) in showCode"
                  :key="index"
                  v-model="item.value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="payCancel"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="paySubmit">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { cancelOrder, paymentOrder } from "@/api/order";
import Message from "@/components/library/Message";
import { useRouter } from "vue-router";
import Confirm from "@/components/library/Confirm";

export default {
  name: "PayOrder",
  props: ["orderInfo"],
  setup(props) {
    const router = useRouter();
    const visible = ref(true);
    const xtxDialogInstance = ref(null);
    // 输入值
    const payCode = ref("");
    // 展示值
    const showCode = ref([
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ]);
    const getNum = () => {
      for (let i = 0; i < payCode.value.length; i++) {
        showCode.value[i].value = payCode.value.charAt(i);
      }
    };
    const delNum = () => {
      const oEvent = window.event;
      if (oEvent.keyCode == 8) {
        if (payCode.value.length > 0) {
          showCode.value[payCode.value.length - 1].value = "";
        }
      }
    };

    // 密码支付
    const paySubmit = async () => {
      if (payCode.value.length < 6) {
        Message({ type: "warn", text: "请输入支付密码" });
        return;
      }
      const { code } = await paymentOrder({
        id: props.orderInfo.id,
        payPassword: payCode.value,
      });
      if (code == 200) {
        // 关闭弹框
        visible.value = false;
        // 跳转到支付
        router.push({
          path: "/checkout/payresult",
          query: { orderId: props.orderInfo.id },
        });
      }
    };
    // 取消支付
    const payCancel = () => {
      Confirm({ content: "您是否要取消订单" })
        .then(async () => {
          const { code } = await cancelOrder(props.orderInfo.id);
          if (code == 200) {
            // 关闭弹框
            visible.value = false;
            // 跳转到支付
            router.push(`/member/order/${props.orderInfo.id}`);
          }
        })
        .catch(() => {
          Message({ type: "success", text: "已撤销取消订单操作" });
        });
    };
    return {
      visible,
      xtxDialogInstance,
      payCode,
      showCode,
      getNum,
      delNum,
      paySubmit,
      payCancel,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 666px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .pay_value {
    width: 280px;
    height: 38px;
    position: absolute;
    top: 199px;
    left: 54%;
    margin-left: -140px;
    background: none;
    opacity: 0;
  }
  .pay_value_box {
    width: 100%;
    margin-top: 20px;
    input {
      width: 38px;
      height: 38px;
      margin-left: 10px;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 16px;
    }
    input:nth-child(1) {
      margin-left: 0px;
    }
  }
}
</style>

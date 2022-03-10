<!-- 结算 -->
<template>
  <AppLayout>
    <div class="xtx-pay-checkout-page">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem path="/cart">购物车</XtxBreadItem>
          <XtxBreadItem>填写订单</XtxBreadItem>
        </XtxBread>
        <div class="wrapper">
          <!-- 收货地址 -->
          <h3 class="box-title">收货地址</h3>
          <div class="box-body">
            <CheckoutAddress ref="checkoutAddressInstance"></CheckoutAddress>
          </div>
          <!-- 商品信息 -->
          <h3 class="box-title">商品信息</h3>
          <div class="box-body">
            <table class="goods" v-if="order">
              <thead>
                <tr>
                  <th>商品信息</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="goods in order.goods" :key="goods.cartId">
                  <td>
                    <a href="javascript:" class="info">
                      <img :src="goods.picture" alt="" />
                      <div class="right">
                        <p>{{ goods.name }}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{ Number(goods.price).toFixed(2) }}</td>
                  <td>{{ goods.count }}</td>
                  <td>&yen;{{ Number(goods.totalPrice).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 配送时间 -->
          <h3 class="box-title">配送时间</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:"
              >不限送货时间：周一至周日</a
            >
            <a class="my-btn" href="javascript:">工作日送货：周一至周五</a>
            <a class="my-btn" href="javascript:"
              >双休日、假日送货：周六至周日</a
            >
          </div>
          <!-- 支付方式 -->
          <h3 class="box-title">支付方式</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:">在线支付</a>
            <a class="my-btn" href="javascript:">货到付款</a>
            <span style="color: #999">货到付款需付5元手续费</span>
          </div>
          <!-- 金额明细 -->
          <h3 class="box-title">金额明细</h3>
          <div class="box-body" v-if="order">
            <div class="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{{ order.goodsTotalCount }}件</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{{ Number(order.goodsTotalPrice).toFixed(2) }}</dd>
              </dl>
              <dl>
                <dt>运<i></i>费：</dt>
                <dd>¥{{ Number(order.postFee).toFixed(2) }}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd class="price">
                  ¥{{ Number(order.payTotalPrice).toFixed(2) }}
                </dd>
              </dl>
            </div>
          </div>
          <!-- 提交订单 -->
          <div class="submit">
            <XtxButton type="primary" @click="referOrder">提交订单</XtxButton>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  <!--  支付对话框  -->
  <PayOrder
    v-if="orderInfo"
    ref="payOrderInstance"
    :orderInfo="orderInfo"
  ></PayOrder>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import CheckoutAddress from "@/views/pay/components/CheckoutAddress";
import PayOrder from "@/views/pay/components/PayOrder";
import { createOrder, produceOrder } from "@/api/order";
import { ref } from "vue";
import Message from "@/components/library/Message";
export default {
  name: "CheckoutPage",
  setup() {
    // 获取订单信息
    const { order } = getOrderInfo();
    // 获取收货地址组件实例
    const checkoutAddressInstance = ref();
    // 获取支付组件实例
    const payOrderInstance = ref();
    const orderInfo = ref();
    // 提交订单
    const referOrder = async () => {
      // 收集订单信息
      const orderParams = {
        // 支付渠道 1 为在线支付
        payChannel: 1,
        // 支付方式 1 支付宝
        payType: 1,
        // 收货地址 id
        addressId: checkoutAddressInstance.value.finalAddress?.id,
        // 商品集合
        goods: order.value.goods,
        // 商品总数量
        totalNum: order.value.goodsTotalCount,
        // 商品总价格
        totalMoney: order.value.goodsTotalPrice,
        // 邮费
        postFee: order.value.postFee,
        // 应付总额
        payMoney: order.value.payTotalPrice,
      };
      if (!orderParams.addressId) {
        return Message({ type: "error", text: "请选择收货地址" });
      }
      // 发送请求提交订单
      const { code, data } = await createOrder(orderParams);
      if (code === 200) {
        orderInfo.value = data;
        Message({ type: "success", text: data.msg });
        // 显示支付弹框
        setTimeout(() => {
          payOrderInstance.value.visible = true;
        }, 0);
      } else {
        Message({ type: "error", text: "订单提交失败" });
      }
    };
    return {
      order,
      checkoutAddressInstance,
      referOrder,
      payOrderInstance,
      orderInfo,
    };
  },
  components: { AppLayout, CheckoutAddress, PayOrder },
};
// 获取生成的订单信息
function getOrderInfo() {
  // 用于存储订单信息
  const order = ref(null);
  // 创建订单并存储订单信息
  produceOrder().then(({ data }) => (order.value = data));
  // 返回订单信息
  return { order };
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  text-align: left;
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 70px;
      color: #999;
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>

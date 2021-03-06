<!-- 下单结算 -->
<template>
  <AppLayout>
    <div class="xtx-pay-checkout-page" v-if="orderInfo">
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
            <table class="goods">
              <thead>
                <tr>
                  <th>商品信息</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>实付</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderInfo.goods" :key="item.id">
                  <td>
                    <a href="javascript:" class="info">
                      <img :src="item.picture" alt="" />
                      <div class="right">
                        <p>{{ item.name }}</p>
                        <p>{{ item.attrsText }}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{ item.price }}</td>
                  <td>{{ item.count }}</td>
                  <td>&yen;{{ item.totalPrice }}</td>
                  <td>&yen;{{ item.totalPayPrice }}</td>
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
          <div class="box-body">
            <div class="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{{ orderInfo.summary.goodsCount }}</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{{ orderInfo.summary.totalPrice }}</dd>
              </dl>
              <dl>
                <dt>运<i></i>费：</dt>
                <dd>¥{{ orderInfo.summary.postFee }}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd class="price">¥{{ orderInfo.summary.totalPayPrice }}</dd>
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
</template>
<script>
import CheckoutAddress from "@/views/pay/components/CheckoutAddress";
import AppLayout from "@/components/AppLayout";
import { ref } from "vue";
import { createOrder, submitOrder } from "@/api/order";
import Message from "@/components/library/Message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { createOrderById } from "@/api/member";
export default {
  name: "CheckoutPage",
  setup() {
    const router = useRouter();
    const store = useStore();
    // 获取生成的订单信息
    const { orderInfo } = useOrderInfo();
    // 获取收货地址组件实例对象
    const checkoutAddressInstance = ref();
    // 提交订单
    const referOrder = async () => {
      // 收集订单信息
      const orderParams = {
        // 买家留言
        buyerMessage: "",
        // 支付渠道 1 为在线支付
        payChannel: 1,
        // 支付方式 1 支付宝
        payType: 1,
        // 配送时间 1 不限
        deliveryTimeType: 1,
        // 收货地址 id
        addressId: checkoutAddressInstance.value.finalAddress?.id,
        // 商品集合
        goods: orderInfo.value.goods.map((item) => ({
          count: item.count,
          skuId: item.skuId,
        })),
      };
      // 判断收货地址是否存在
      if (!orderParams.addressId) {
        return Message({ type: "error", text: "请选择收货地址" });
      }
      //  提交订单
      const { result } = await submitOrder(orderParams);
      //  成功后跳转支付页面
      await router.push({
        path: "/checkout/pay",
        query: { orderId: result.id },
      });
      await store.dispatch("cart/autoupdateGoodsofCart");
    };
    return { orderInfo, referOrder, checkoutAddressInstance };
  },
  components: { AppLayout, CheckoutAddress },
};
function useOrderInfo() {
  // 用于存储订单信息
  const orderInfo = ref(null);
  const route = useRoute();
  // 生成订单
  const getData = async () => {
    if (route.query.id) {
      //  再次购买
      const { result } = await createOrderById(route.query.id);
      orderInfo.value = result;
    } else {
      // 购物车创建订单
      const { result } = await createOrder();
      orderInfo.value = result;
    }
  };
  // 获取生成的订单信息
  getData();
  return { orderInfo, getData };
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
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
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
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

<!-- 订单列表 -->
<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span
        class="down-time"
        v-if="order.orderState === 1 && order.countdown !== -1"
      >
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ dayjs.unix(count).format("mm分ss秒") }}</b>
      </span>
      <a
        href="javascript:"
        class="del"
        v-if="[5, 6].includes(order.orderState)"
        @click="onDeleteOrderHandler(order.id)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <router-link class="image" :to="`/goods/${goods.id}`">
              <img :src="goods.image" alt="" />
            </router-link>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }}</span>
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <a
          href="javascript:"
          class="green"
          v-if="order.orderState === 3"
          @click="lookLogistics(order.id)"
          >查看物流</a
        >
        <a href="javascript:" class="green" v-if="order.orderState === 4"
          >评价商品</a
        >
        <a href="javascript:" class="green" v-if="order.orderState === 5"
          >查看评价</a
        >
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线付款</p>
      </div>
      <div class="column action">
        <XtxButton
          type="primary"
          size="small"
          v-if="order.orderState === 1"
          @click="$router.push(`/member/pay?orderId=${order.id}`)"
          >立即付款</XtxButton
        >
        <XtxButton
          type="primary"
          size="small"
          v-if="order.orderState === 3"
          @click="onConfirmReceiptHandler(order.id)"
          >确认收货</XtxButton
        >
        <p>
          <router-link :to="`/member/order/${order.id}`">查看详情</router-link>
        </p>
        <p v-if="order.orderState === 1">
          <a href="javascript:;" @click="onCancelOrderHandler(order.id)"
            >取消订单</a
          >
        </p>
        <p v-if="[2, 3, 4, 5].includes(order.orderState)">
          <a href="javascript:;">再次购买</a>
        </p>
        <p v-if="[4, 5].includes(order.orderState)">
          <a href="javascript:;">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useCountDown from "@/hooks/useCountDown";
import dayjs from "dayjs";
import { orderStatus } from "@/api/canstants";
import Confirm from "@/components/library/Confirm";
import { confirmReceiptGoods, deleteOrder } from "@/api/member";
import Message from "@/components/library/Message";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    //  倒计时
    const { start, count } = useCountDown();
    if (props.order.orderState === 1 && props.order.countdown !== -1) {
      // 开始倒计时
      start(props.order.countdown);
    }
    // 取消订单
    const onCancelOrderHandler = (id) => {
      emit("onCancelOrder", id);
    };
    // 删除
    const onDeleteOrderHandler = (id) => {
      Confirm({ title: "温馨提示", content: "订单删除后不可恢复" })
        .then(() => deleteOrder([id]))
        .then(() => Message({ type: "success", text: "订单删除成功" }))
        .then(() => emit("onReloadOrderList"));
    };
    // 确认收货
    const onConfirmReceiptHandler = async (id) => {
      try {
        await Confirm({ content: "确定要进行收货吗" });
        await confirmReceiptGoods(id);
        Message({ type: "success", text: "确认收货成功" });
        // 重新获取订单列表
        emit("onReloadOrderList");
      } catch (e) {
        Message({ type: "error", text: "确认收货失败" });
      }
    };
    // 查看物流
    const lookLogistics = (id) => {
      emit("onLookLogistics", id);
    };
    return {
      count,
      dayjs,
      orderStatus,
      onCancelOrderHandler,
      onDeleteOrderHandler,
      onConfirmReceiptHandler,
      lookLogistics,
    };
  },
};
</script>

<style lang="less" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>

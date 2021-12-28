<!-- 订单列表 -->
<template>
  <AppMemberLayout>
    <div class="member-order">
      <!-- 切换项  -->
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">{{
          status.label
        }}</XtxTabTitle>
      </XtxTabs>
      <!-- 对应内容 -->
      <div class="order-list">
        <div class="loading" v-if="loading"></div>
        <template v-if="!loading && orderList && orderList.items.length > 0">
          <OrderItem
            v-for="item in orderList.items"
            :key="item.id"
            :order="item"
            @onCancelOrder="onCancelOrder"
            @onReloadOrderList="getData"
            @onLookLogistics="onLookLogistics"
          ></OrderItem>
        </template>
        <div v-if="!loading && orderList?.items?.length === 0" class="none">
          暂无数据
        </div>
        <XtxPagination
          v-if="!loading && orderList && totalPage > 1"
          v-model:page="reqParams.page"
          :pageSize="reqParams.pageSize"
          :totalCount="totalCount"
        />
      </div>
    </div>
  </AppMemberLayout>
  <CancelOrder
    ref="cancelOrderComponent"
    @onReloadOrderList="getData"
  ></CancelOrder>
  <OrderLogistics ref="orderLogisticsInstance"></OrderLogistics>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import OrderItem from "@/views/member/order/components/OrderItem";
import CancelOrder from "@/views/member/order/components/CancelOrder";
import OrderLogistics from "@/views/member/order/components/OrderLogistics";
import { ref, watch } from "vue";
import { orderStatus } from "@/api/canstants";
import { getOrderlist } from "@/api/member";
export default {
  name: "OrderListPage.vue",
  setup() {
    // 切换当前索引
    const active = ref(0);
    // 订单列表数据
    const { orderList, reqParams, loading, totalCount, totalPage, getData } =
      useOrderList();
    // 监听选项卡切换
    watch(active, (current) => {
      //  重置订单状态
      reqParams.value.orderState = current;
      // 重置页码参数
      reqParams.value.page = 1;
    });
    // 取消订单弹层组件实例
    const cancelOrderComponent = ref();
    // 点击取消订单
    const onCancelOrder = (id) => {
      cancelOrderComponent.value.visible = true;
      cancelOrderComponent.value.id = id;
    };
    // 查看物流弹层组件实例
    const orderLogisticsInstance = ref();
    // 点击查看物流
    const onLookLogistics = (id) => {
      orderLogisticsInstance.value.visible = true;
      orderLogisticsInstance.value.id = id;
    };
    return {
      active,
      orderStatus,
      orderList,
      loading,
      reqParams,
      totalCount,
      totalPage,
      cancelOrderComponent,
      onCancelOrder,
      getData,
      onLookLogistics,
      orderLogisticsInstance,
    };
  },
  components: { AppMemberLayout, OrderItem, CancelOrder, OrderLogistics },
};
// 获取订单列表数据
function useOrderList() {
  // 存储订单列表
  const orderList = ref();
  // 请求参数 0 全部订单
  const reqParams = ref({ page: 1, pageSize: 3, orderState: 0 });
  // 订单列表数据加载状态
  const loading = ref(false);
  // 用于存储总数据条数
  const totalCount = ref(0);
  // 用于存储总页数
  const totalPage = ref(0);
  const getData = async () => {
    loading.value = true;
    const { result } = await getOrderlist(reqParams.value);
    orderList.value = result;
    totalCount.value = result.counts;
    totalPage.value = result.pages;
    loading.value = false;
  };
  // 监听请求参数变化,重新获取数据
  watch(reqParams.value, () => getData(), { immediate: true });
  return { orderList, reqParams, loading, totalCount, totalPage, getData };
}
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
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
.loading {
  height: calc(100% - 60px);
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 60px;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center 18%;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
  background: rgba(255, 255, 255, 0.9);
}
</style>

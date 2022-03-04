<template>
  <AppLayout>
    <div class="cart-page">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem>购物车</XtxBreadItem>
        </XtxBread>
        <div class="cart">
          <table>
            <thead>
              <tr>
                <th>
                  <XtxCheckbox
                    :modelValue="selectAllButtonStatus"
                    @update:modelValue="selectAllGoods($event)"
                    >全选</XtxCheckbox
                  >
                </th>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 有效商品 -->
            <tbody>
              <tr v-if="effectiveGoodsCount === 0">
                <td colspan="6">
                  <EmptyCart />
                </td>
              </tr>
              <tr
                v-else
                v-for="goods in effectiveGoodsList"
                :key="goods.cart_id"
              >
                <!--  单选  -->
                <td>
                  <XtxCheckbox
                    :modelValue="Boolean(goods.selected)"
                    @update:modelValue="selectGoods(goods.cart_id, $event)"
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${goods.goods_id}`"
                      ><img :src="goods.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ goods.name }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ goods.price }}</p>
                  <p v-if="goods.old_price - goods.price > 0">
                    比加入时降价
                    <span class="red"
                      >&yen;{{
                        (goods.old_price - goods.price).toFixed(2)
                      }}</span
                    >
                  </p>
                </td>
                <td class="tc">
                  <XtxNumberBox
                    :max="Number(goods.inventory)"
                    :modelValue="Number(goods.count)"
                    @update:modelValue="
                      $store.dispatch('cart/updatedCartCount', {
                        cartId: goods.cart_id,
                        count: $event,
                      })
                    "
                  ></XtxNumberBox>
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (goods.price * goods.count).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:">移入收藏夹</a></p>
                  <p>
                    <a
                      class="green"
                      href="javascript:"
                      @click="delCartGoods(goods.cart_id)"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action" v-if="effectiveGoodsList.length > 0">
          <div class="batch">
            <XtxCheckbox
              :modelValue="selectAllButtonStatus"
              @update:modelValue="selectAllGoods($event)"
              >全选</XtxCheckbox
            >
            <a href="javascript:" @click="clearCartGoods">清空购物车</a>
            <a href="javascript:" @click="delCartCheckedGoods"
              >删除已选中商品</a
            >
            <a href="javascript:" @click="delCartNoCheckedGoods"
              >删除未选中商品</a
            >
          </div>
          <div class="total">
            共 {{ effectiveGoodsCount }} 件商品，已选择
            {{ userSelectedGoodsCount }} 件，商品合计：
            <span class="red">¥{{ userSelectedGoodsPrice }}</span>
            <XtxButton @click="jumpToCheckout" type="primary"
              >下单结算</XtxButton
            >
          </div>
        </div>
        <!-- 猜你喜欢 -->
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import EmptyCart from "@/views/cart/components/EmptyCart";
import { useStore } from "vuex";
import { computed } from "vue";
import Message from "@/components/library/Message";
import { useRouter } from "vue-router";
import Confirm from "@/components/library/Confirm";
export default {
  name: "CartPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 获取购物车列表
    store.dispatch("cart/getCartGoodsList");
    // 有效商品列表
    const effectiveGoodsList = computed(
      () => store.getters["cart/effectiveGoodsList"]
    );
    // 有效商品总数量
    const effectiveGoodsCount = computed(
      () => store.getters["cart/effectiveGoodsCount"]
    );
    // 用户选中的商品数量
    const userSelectedGoodsCount = computed(
      () => store.getters["cart/userSelectedGoodsCount"]
    );
    // 用户选中的商品总价
    const userSelectedGoodsPrice = computed(
      () => store.getters["cart/userSelectedGoodsPrice"]
    );
    // 删除单个商品
    const delCartGoods = (id) => {
      // 询问是否删除
      Confirm({
        content: "您确定要删除该商品吗?",
      })
        .then(() => store.dispatch("cart/delCartGoods", id))
        .catch(() => {
          Message({ type: "warn", text: "已取消删除" });
        });
    };
    // 单选
    const selectGoods = (cartId, isSelected) => {
      store.dispatch("cart/updateSelectStatus", {
        cartId,
        selected: isSelected,
      });
    };
    const selectAllButtonStatus = computed(
      () => store.getters["cart/selectAllButtonStatus"]
    );
    // 全选
    const selectAllGoods = (isAllSelected) => {
      store.dispatch("cart/goodsAllselected", isAllSelected);
    };
    // 清空购物车
    const clearCartGoods = () => {
      // 询问是否删除
      Confirm({
        content: "您确定要清空购物车吗?",
      })
        .then(() => store.dispatch("cart/delSomeGoods"))
        .catch(() => {
          Message({ type: "warn", text: "已取消操作！" });
        });
    };
    // 删除已选中商品
    const delCartCheckedGoods = () => {
      // 询问是否删除
      Confirm({
        content: "您确定要删除已选中的商品吗?",
      })
        .then(() => store.dispatch("cart/delSomeGoods", 1))
        .catch(() => {
          Message({ type: "warn", text: "已取消操作！" });
        });
    };
    // 删除未选中商品
    const delCartNoCheckedGoods = () => {
      // 询问是否删除
      Confirm({
        content: "您确定要删除未选中的商品吗?",
      })
        .then(() => store.dispatch("cart/delSomeGoods", 0))
        .catch(() => {
          Message({ type: "warn", text: "已取消操作！" });
        });
    };
    // 下单结算按钮
    const jumpToCheckout = () => {
      // 判断用户是否选择了商品
      if (userSelectedGoodsCount.value === 0) {
        return Message({ type: "error", text: "请至少选择一件商品" });
      }
      // 跳转到结算页面
      router.push("/checkout/order");
    };
    return {
      effectiveGoodsList,
      effectiveGoodsCount,
      userSelectedGoodsCount,
      userSelectedGoodsPrice,
      delCartGoods,
      selectGoods,
      selectAllButtonStatus,
      selectAllGoods,
      clearCartGoods,
      delCartCheckedGoods,
      delCartNoCheckedGoods,
      jumpToCheckout,
    };
  },
  components: { AppLayout, EmptyCart },
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-number-box {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      width: 100%;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>

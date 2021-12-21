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
              <tr v-else v-for="item in effectiveGoodsList" :key="item.id">
                <td>
                  <XtxCheckbox
                    :modelValue="item.selected"
                    @update:modelValue="selectGoods(item.skuId, $event)"
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${item.id}`"
                      ><img :src="item.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ item.name }}
                      </p>
                      <!-- 选择规格组件 -->
                      <CartSku
                        :attrsText="item.attrsText"
                        :skuId="item.skuId"
                      ></CartSku>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                  <p v-if="item.price - item.nowPrice > 0">
                    比加入时降价
                    <span class="red"
                      >&yen;{{ (item.price - item.nowPrice).toFixed(2) }}</span
                    >
                  </p>
                </td>
                <td class="tc">
                  <XtxNumberBox
                    :max="item.stock"
                    :modelValue="item.count"
                    @update:modelValue="
                      $store.dispatch('cart/updateGoodsofCart', {
                        skuId: item.skuId,
                        count: $event,
                      })
                    "
                  ></XtxNumberBox>
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (item.nowPrice * item.count).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:">移入收藏夹</a></p>
                  <p>
                    <a
                      class="green"
                      href="javascript:"
                      @click="delGoods(item.skuId)"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody>
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr v-for="item in invalidGoodsList" :key="item.id">
                <td></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${item.id}`"
                      ><img :src="item.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ item.name }}
                      </p>
                      <p class="attr">{{ item.attrsText }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                </td>
                <td class="tc">{{ item.count }}</td>
                <td class="tc">
                  <p>&yen;{{ (item.nowPrice * item.count).toFixed(2) }}</p>
                </td>
                <td class="tc">
                  <p><a class="green" href="javascript:">删除</a></p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            <XtxCheckbox>全选</XtxCheckbox>
            <a
              href="javascript:"
              @click="delGoodsSelectedOrInvalid('userSelectedGoodsList')"
              >删除商品</a
            >
            <a href="javascript:">移入收藏夹</a>
            <a
              href="javascript:"
              @click="delGoodsSelectedOrInvalid('invalidGoodsList')"
              >清空失效商品</a
            >
          </div>
          <div class="total">
            共 {{ effectiveGoodsCount }} 件商品，已选择
            {{ userSelectedGoodsCount }} 件，商品合计：
            <span class="red">¥{{ userSelectedGoodsPrice }}</span>
            <XtxButton type="primary" @click="jumpToCheckout"
              >下单结算</XtxButton
            >
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <GoodsRelevant />
      </div>
    </div>
  </AppLayout>
</template>
<script>
import EmptyCart from "@/views/cart/components/EmptyCart";
import CartSku from "@/views/cart/components/CartSku";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { computed } from "vue";
import { useStore } from "vuex";
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";
import router from "@/router";
export default {
  name: "CartPage",
  setup() {
    const store = useStore();
    // 更新本地购物车商品信息
    store.dispatch("cart/autoupdateGoodsofCart");
    // 有效商品列表
    const effectiveGoodsList = computed(
      () => store.getters["cart/effectiveGoodsList"]
    );
    // 有效商品总数量
    const effectiveGoodsCount = computed(
      () => store.getters["cart/effectiveGoodsCount"]
    );
    // 无效商品列表
    const invalidGoodsList = computed(
      () => store.getters["cart/invalidGoodsList"]
    );
    // 用户选中的商品数量
    const userSelectedGoodsCount = computed(
      () => store.getters["cart/userSelectedGoodsCount"]
    );
    // 用户选中的商品总价
    const userSelectedGoodsPrice = computed(
      () => store.getters["cart/userSelectedGoodsPrice"]
    );

    // 单选
    const selectGoods = (skuId, isSelected) => {
      store.dispatch("cart/updateGoodsofCart", { skuId, selected: isSelected });
    };
    const selectAllButtonStatus = computed(
      () => store.getters["cart/selectAllButtonStatus"]
    );
    // 全选
    const selectAllGoods = (isAllSelected) => {
      store.dispatch("cart/goodsAllselected", isAllSelected);
    };
    // 删除商品skuId
    const delGoods = (skuId) => {
      // Confirm({
      //   content: "您确定要删除该商品吗?",
      //   onSureButtonClick: () => {
      //     store.dispatch("cart/delGoodsofCart", skuId);
      //     Message({ type: "success", text: "删除成功" });
      //   },
      //   onCancelButtonClick: () => {
      //     Message({ type: "warn", text: "已取消删除" });
      //   },
      // });
      //  升级Confirm方法后使用.then.catch
      Confirm({
        content: "您确定要删除该商品吗?",
      })
        .then(() => {
          store.dispatch("cart/delGoodsofCart", skuId);
          Message({ type: "success", text: "删除成功" });
        })
        .catch(() => {
          Message({ type: "warn", text: "已取消删除" });
        });
    };
    // 删除选中的商品、清空无效商品
    const delGoodsSelectedOrInvalid = (flag) => {
      //  提示框内容
      let content = "";
      if (flag === "userSelectedGoodsList") {
        if (userSelectedGoodsCount.value === 0) {
          return Message({ type: "warn", text: "至少选中一件商品" });
        }
        content = "您确定要删除选中的商品吗";
      } else if (flag === "invalidGoodsList") {
        if (invalidGoodsList.value.length === 0) {
          return Message({ type: "warn", text: "没有无效商品" });
        }
        content = "您确定要删除无效商品吗";
      }
      Confirm({ content }).then(() => {
        store.dispatch("cart/delSelectedOrInvalid", flag);
      });
    };

    // 下单结算
    const jumpToCheckout = () => {
      if (userSelectedGoodsCount.value === 0)
        return Message({ type: "warn", text: "至少有一件商品才可结算" });
      // 跳转到结算页面
      router.push("/checkout/order");
    };
    return {
      effectiveGoodsList,
      effectiveGoodsCount,
      invalidGoodsList,
      userSelectedGoodsCount,
      userSelectedGoodsPrice,
      selectGoods,
      selectAllButtonStatus,
      selectAllGoods,
      delGoods,
      delGoodsSelectedOrInvalid,
      jumpToCheckout,
    };
  },
  components: { GoodsRelevant, AppLayout, EmptyCart, CartSku },
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

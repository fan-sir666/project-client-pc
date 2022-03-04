import {
  delCartByCartId,
  delSomeCartGoods,
  findCartGoodsList,
  updateCartAllStatus,
  updateCartCountByCartId,
  updateCartStatusByCartId,
} from "@/api/cart";
import Message from "@/components/library/Message";

export default {
  namespaced: true,
  state() {
    return {
      // 存储购物车列表
      list: [],
    };
  },
  mutations: {
    // 设置购物车列表
    setCart(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    // 获取购物车列表
    async getCartGoodsList({ commit }) {
      const { data } = await findCartGoodsList();
      // console.log(data);
      commit("setCart", data);
    },
    // 删除购物车单个商品
    async delCartGoods({ dispatch }, cartId) {
      const { data, code } = await delCartByCartId(cartId);
      if (code === 200) {
        Message({ type: "success", text: data.msg });
        // 同步list列表
        dispatch("getCartGoodsList");
      }
    },
    // 数量++ --
    async updatedCartCount({ dispatch }, { cartId, count }) {
      const { code } = await updateCartCountByCartId({ cartId, count });
      if (code === 200) {
        // 同步list列表
        dispatch("getCartGoodsList");
      }
    },
    //  单选
    async updateSelectStatus({ dispatch }, { cartId, selected }) {
      const { code } = await updateCartStatusByCartId({ cartId, selected });
      if (code === 200) {
        // 同步list列表
        dispatch("getCartGoodsList");
      }
    },
    // 全选
    async goodsAllselected({ dispatch }, isAllSelected) {
      const { code } = await updateCartAllStatus({ selected: isAllSelected });
      if (code === 200) {
        // 同步list列表
        dispatch("getCartGoodsList");
      }
    },
    // 删除多个
    async delSomeGoods({ dispatch }, type) {
      const { code, data } = await delSomeCartGoods(type);
      if (code === 200) {
        // 同步list列表
        dispatch("getCartGoodsList");
        Message({ type: "success", text: data.msg });
      }
    },
  },
  getters: {
    // 可购买商品列表
    effectiveGoodsList(state) {
      return state.list.filter(
        (item) => item.isEffective && item.inventory > 0
      );
    },
    // 可购买商品总数量
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    // 可购买商品总价
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList
        .reduce((price, item) => {
          return price + Number(item.price);
        }, 0)
        .toFixed(2);
    },
    //  用户选中的商品列表
    userSelectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    //  用户选中的商品数量
    userSelectedGoodsCount(state, getters) {
      return getters.userSelectedGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    //  用户选中的商品总价
    userSelectedGoodsPrice(state, getters) {
      return getters.userSelectedGoodsList
        .reduce((price, item) => {
          return price + Number(item.price) * item.count;
        }, 0)
        .toFixed(2);
    },
    //  全选按钮的状态
    selectAllButtonStatus(state, getters) {
      return (
        getters.effectiveGoodsList.length > 0 &&
        getters.effectiveGoodsList.length ===
          getters.userSelectedGoodsList.length
      );
    },
  },
};

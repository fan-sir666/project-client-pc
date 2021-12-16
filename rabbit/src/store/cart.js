import { updateGoodsOfCartBySkuId } from "@/api/cart";

export default {
  namespaced: true,
  state() {
    return {
      // 存储购物车列表
      list: [],
    };
  },
  mutations: {
    //  添加商品
    addGoodsToCart(state, goods) {
      //  list已存在实行数量累加，不存在添加到list头部
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      if (index > -1) {
        console.log(index);
        //  已存在商品
        state.list[index].count += goods.count;
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        // 不存在
        state.list.unshift(goods);
      }
    },
    //  删除商品
    delGoodsofCart(state, skuId) {
      state.list = state.list.filter((item) => item.skuId !== skuId);
    },
    //  自动更新商品
    autoupdateGoodsofCart(state, upGoods) {
      const index = state.list.findIndex(
        (item) => item.skuId === upGoods.skuId
      );
      state.list[index] = {
        ...state.list[index],
        ...upGoods,
      };
    },
    //  更新商品
    updateGoodsofCart(state, goods) {
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      state.list[index] = {
        ...state.list[index],
        ...goods,
      };
    },
    goodsAllselected(state, payload) {
      state.list.forEach((item) => (item.selected = payload));
    },
  },
  actions: {
    // 添加商品
    addGoodsToCart({ rootState, commit }, goods) {
      if (rootState.user.profile.token) {
        //  登录
      } else {
        //  未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除商品
    delGoodsofCart({ rootState, commit }, payload) {
      if (rootState.user.profile.token) {
        //  登录
      } else {
        //  未登录
        commit("delGoodsofCart", payload);
      }
    },
    //  更新商品列表（自动更新）
    autoupdateGoodsofCart({ rootState, state, commit }) {
      if (rootState.user.profile.token) {
        //  登录
      } else {
        //  未登录
        const promiseAry = state.list.map((item) =>
          updateGoodsOfCartBySkuId(item.skuId)
        );
        Promise.all(promiseAry).then((data) => {
          // console.log(data);
          data.forEach((item, index) => {
            //  返回数据没有skuId我们给数据加上
            item.result.skuId = state.list[index].skuId;
            commit("autoupdateGoodsofCart", item.result);
          });
        });
      }
    },
    // 更新商品(单选)
    updateGoodsofCart({ rootState, commit }, goods) {
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("updateGoodsofCart", goods);
      }
    },
    //  全选
    goodsAllselected({ rootState, commit }, payload) {
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("goodsAllselected", payload);
      }
    },
  },
  getters: {
    // 可购买商品列表
    effectiveGoodsList(state) {
      return state.list.filter((item) => item.isEffective && item.stock > 0);
    },
    // 可购买商品总数量
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    // 可购买商品总价
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        return price + Number(item.nowPrice);
      }, 0);
    },
    //  无效商品列表
    invalidGoodsList(state) {
      return state.list.filter((item) => !item.isEffective || item.stock === 0);
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
          return price + Number(item.nowPrice) * item.count;
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

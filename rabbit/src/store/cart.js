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
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        return price + Number(item.nowPrice);
      }, 0);
    },
  },
};

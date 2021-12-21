import {
  addServerGoodsCart,
  delServerGoodsCart,
  getServerCartList,
  mergeServerCart,
  selectedServerGoodsCart,
  updateGoodsOfCartBySkuId,
  updateServerGoodsCart,
} from "@/api/cart";

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
    //  更新商品
    updateGoodsofCart(state, upGoods) {
      const index = state.list.findIndex(
        (item) => item.skuId === upGoods.skuId
      );
      state.list[index] = {
        ...state.list[index],
        ...upGoods,
      };
    },
    //  设置购物车列表
    setCart(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    // 添加商品
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      if (rootState.user.profile.token) {
        //  登录
        await addServerGoodsCart({ skuId: goods.skuId, count: goods.count });
        dispatch("autoupdateGoodsofCart");
      } else {
        //  未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除商品
    async delGoodsofCart({ rootState, commit, dispatch }, payload) {
      if (rootState.user.profile.token) {
        //  登录
        await delServerGoodsCart([payload]);
        dispatch("autoupdateGoodsofCart");
      } else {
        //  未登录
        commit("delGoodsofCart", payload);
      }
    },
    //  更新商品列表（自动更新）
    async autoupdateGoodsofCart({ rootState, state, commit }) {
      if (rootState.user.profile.token) {
        //  登录
        const { result } = await getServerCartList();
        commit("setCart", result);
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
            commit("updateGoodsofCart", item.result);
          });
        });
      }
    },
    // 更新单个商品 (状态、数量)
    async updateGoodsofCart({ rootState, commit, dispatch }, goods) {
      if (rootState.user.profile.token) {
        // 登录
        await updateServerGoodsCart(goods);
        dispatch("autoupdateGoodsofCart");
      } else {
        // 未登录
        commit("updateGoodsofCart", goods);
      }
    },
    //  全选
    async goodsAllselected(
      { rootState, state, getters, commit, dispatch },
      payload
    ) {
      if (rootState.user.profile.token) {
        // 登录
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        await selectedServerGoodsCart({ ids, selected: payload });
        dispatch("autoupdateGoodsofCart");
      } else {
        // 未登录
        state.list.forEach((item) =>
          commit("updateGoodsofCart", { skuId: item.skuId, selected: payload })
        );
      }
    },
    //  删除用户选中的商品、清空无效商品
    async delSelectedOrInvalid({ rootState, getters, commit, dispatch }, flag) {
      if (rootState.user.profile.token) {
        //  登录
        const skuIds = getters[flag].map((item) => item.skuId);
        await delServerGoodsCart(skuIds);
        dispatch("autoupdateGoodsofCart");
      } else {
        //  未登录
        getters[flag].forEach((item) => {
          commit("delGoodsofCart", item.skuId);
        });
      }
    },
    // 商品规格更新
    async updateGoodsChangeSku(
      { rootState, state, commit, dispatch },
      { oldSkuId, newSku }
    ) {
      const index = state.list.findIndex((item) => item.skuId === oldSkuId);
      if (rootState.user.profile.token) {
        //  登录
        await delServerGoodsCart([oldSkuId]);
        await addServerGoodsCart({
          skuId: newSku.skuId,
          count: state.list[index].count,
        });
        dispatch("autoupdateGoodsofCart");
      } else {
        //  未登录
        // console.log(oldSkuId, newSku);
        // 构建新的商品
        const newGoods = {
          ...state.list[index],
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.specsText,
        };
        //  删除旧商品
        commit("delGoodsofCart", oldSkuId);
        //  添加更新规格商品
        commit("addGoodsToCart", newGoods);
      }
    },
    // 合并购物车
    async mergeGoodsCart({ state, commit }) {
      if (state.list.length === 0) return;
      const cart = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      // console.log(cart);
      await mergeServerCart(cart);
      commit("setCart", []);
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

import { requestWithoutToken, requestWithToken } from "@/utils/request";

/**
 * 添加购物车
 * @param id 商品ID
 * @param count 商品数量
 * @param selected 是否选中
 * @param picture 商品图片
 * @param userId 用户ID
 * @returns {Promise}
 */
export function addGoodsCart({ id, count, selected, picture }) {
  return requestWithToken("/cart/addcartgoods", "post", {
    good_id: id,
    selected,
    picture,
    count,
  });
}

/**
 * 获取购物车列表数据
 * @param userId 用户id
 * @returns {Promise}
 */
export function findCartGoodsList() {
  return requestWithToken("/cart/getcartgoodslist", "get");
}

// 删除购物车商品
export function delCartByCartId(cartId) {
  return requestWithToken("/cart/delcartgoods", "post", { cartId });
}

// 更新购物车数量
export function updateCartCountByCartId({ cartId, count }) {
  return requestWithToken("/cart/updatecartcount", "post", { cartId, count });
}

// 更新购物车状态 单选
export function updateCartStatusByCartId({ cartId, selected }) {
  return requestWithToken("/cart/updatecartstatus", "post", {
    cartId,
    selected,
  });
}

// 更新购物车状态 全选
export function updateCartAllStatus({ selected }) {
  return requestWithToken("/cart/updatecartallstatus", "post", {
    selected,
  });
}

// 删除多个
export function delSomeCartGoods(type) {
  return requestWithToken("/cart/delsomecartgoods", "post", {
    type,
  });
}

// 猜你喜欢
export function getCartHotSale() {
  return requestWithoutToken("/goods/hotsale", "get");
}

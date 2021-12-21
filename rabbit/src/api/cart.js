import { requestWithoutToken, requestWithToken } from "@/utils/request";

/**
 * 更新商品信息
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return requestWithoutToken(`/goods/stock/${skuId}`, "get");
}

/**
 * 获取规格信息
 * @param skuId
 * @returns {Promise}
 */
export function getSkuInfoBySkuId(skuId) {
  return requestWithoutToken(`/goods/sku/${skuId}`, "get");
}

/**
 * 合并购物车
 * @param cart [{skuId,selected,count}]
 * @returns {Promise}
 */
export function mergeServerCart(cart) {
  return requestWithToken("/member/cart/merge", "post", cart);
}

/**
 * 获取服务端购物车列表
 * @returns {Promise}
 */
export function getServerCartList() {
  return requestWithToken("/member/cart", "get");
}

/**
 * 将商品加入购物车
 * @param skuId
 * @param count
 * @returns {Promise}
 */
export function addServerGoodsCart({ skuId, count }) {
  return requestWithToken("/member/cart", "post", { skuId, count });
}

/**
 * 删除购物车商品 (单个、批量)
 * @param ids 商品skuId数组
 * @returns {Promise}
 */
export function delServerGoodsCart(ids) {
  return requestWithToken("/member/cart", "delete", { ids });
}

/**
 * 更新购物车商品 (状态、数量)
 * @param skuId
 * @param selected
 * @param count
 * @returns {Promise}
 */
export function updateServerGoodsCart({ skuId, selected, count }) {
  return requestWithToken(`/member/cart/${skuId}`, "put", { selected, count });
}

/**
 * 全选取消全选
 * @param selected
 * @param ids
 * @returns {Promise}
 */
export function selectedServerGoodsCart({ selected, ids }) {
  return requestWithToken("/member/cart/selected", "put", { selected, ids });
}

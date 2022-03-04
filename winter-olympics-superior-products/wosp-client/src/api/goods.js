import { requestWithoutToken } from "@/utils/request";

/**
 * 获取商品信息
 * @param id 商品Id
 * @returns {Promise}
 */
export function getGoodsDetail(id) {
  return requestWithoutToken("/goods/detailinfo", "post", { id });
}

/**
 * 获取同类推荐
 * @param id 商品id
 * @param cateId 分类id
 * @param limit 数据条数
 * @returns {Promise}
 */
export function getGoodsRecommend(id, cateId, limit = 16) {
  return requestWithoutToken("/goods/recommend", "post", { id, cateId, limit });
}

// 获取热榜数据
export function getHotGoods() {
  return requestWithoutToken("/goods/hotgoods", "get");
}

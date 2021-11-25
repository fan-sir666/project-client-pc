import { requestWithoutToken } from "@/utils/request";

/**
 * 获取商品详情信息
 * @param id 商品id
 * @returns {Promise}
 */
export function getGoodsDetailById(id) {
  return requestWithoutToken("/goods", "get", { id });
}

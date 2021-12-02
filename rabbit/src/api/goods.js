import { requestWithoutToken } from "@/utils/request";

/**
 * 获取商品详情信息
 * @param id 商品id
 * @returns {Promise}
 */
export function getGoodsDetailById(id) {
  return requestWithoutToken("/goods", "get", { id });
}

/**
 * 获取同类推荐或猜你喜欢
 * @param id 商品ID
 * @param limit
 * @returns {Promise}
 */
export function getRelevantGoods({ id, limit = 16 }) {
  return requestWithoutToken("/goods/relevant", "get", { id, limit });
}

/**
 * 获取热榜数据
 * @param id 商品ID
 * @param limit
 * @param type 热销类型, 1为24小时，2为周榜，3为总榜，默认为1
 * @returns {Promise}
 */
export function getHotGoodsApi({ id, limit = 3, type = 1 }) {
  return requestWithoutToken("/goods/hot", "get", { id, limit, type });
}

/**
 * 获取商品评价头部数据
 * @param id 商品id
 * @return {Promise}
 */
export function getCommentInfoApi(id) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    "get"
  );
}
/**
 * 获取评论列表数据
 * @param params 其他的查询参数
 * @return {Promise}
 */
export function getCommentListApi(params) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${params.id}/evaluate/page`,
    "get",
    params
  );
}

import { requestWithoutToken } from "@/utils/request";

/**
 * 获取热门品牌
 * @param limit 请求多少条数据
 * @returns {Promise}
 */
export function getHotBrands(limit = 6) {
  return requestWithoutToken("/home/brand", "get", { limit });
}

/**
 * 获取轮播图
 * @param distributionSite 1 首页轮播图 2 分类页轮播图
 * @returns {Promise}
 */
export function getBanners(distributionSite = 1) {
  return requestWithoutToken("/home/banner", "get", { distributionSite });
}

/**
 * 获取新鲜好物
 * @param limit 请求多少条数据
 * @returns {Promise}
 */
export function getNewGoods(limit = 4) {
  return requestWithoutToken("/home/new", "get", { limit });
}

/**
 * 获取人气推荐
 * @returns {Promise}
 */
export function getHomeHot() {
  return requestWithoutToken("/home/hot", "get");
}

/**
 * 获取产品区块数据
 * @returns {Promise}
 */
export function getProducts() {
  return requestWithoutToken("/home/goods", "get");
}

export function getSpecial(limit = 3) {
  return requestWithoutToken("/home/special", "get", { limit });
}

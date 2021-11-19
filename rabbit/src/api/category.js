import { requestWithoutToken } from "@/utils/request";
/**
 * 获取分类列表
 * @returns {Promise}
 */
export function getCategoriesApi() {
  return requestWithoutToken("/home/category/head", "get");
}

/**
 * 获取一级分类商品推荐
 * @param id 一级分类ID
 * @returns {Promise}
 */
export function getTopCategoryById(id) {
  return requestWithoutToken("/category", "get", { id });
}

/**
 * 获取二级分类筛选条件数据
 * @param 二级分类ID
 * @returns {Promise}
 */
export function getSubCategoryFilterById(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}

import { requestWithoutToken } from "@/utils/request";

// 分页获取分类列表商品
export function getCateGoryList(params) {
  return requestWithoutToken("/category/goodslist", "post", params);
}

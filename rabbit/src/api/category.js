import { requestWithoutToken } from "@/utils/request";

// 获取分类列表
export function getCategoriesApi() {
  return requestWithoutToken("/home/category/head", "get");
}

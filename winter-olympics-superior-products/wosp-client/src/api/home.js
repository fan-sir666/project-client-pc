import { requestWithoutToken } from "@/utils/request";

// 首页头部分类导航
export function getHeadCategory() {
  return requestWithoutToken("/home/category/head", "get");
}

// 轮播图
export function getBanners() {
  return requestWithoutToken("/home/banner", "get");
}

// 新鲜好物
export function getNewGoods() {
  return requestWithoutToken("/home/newgoods", "get");
}

// 热销商品
export function getHotGoods() {
  return requestWithoutToken("/home/hotgoods", "get");
}

// 参品区块
export function getProductGoods() {
  return requestWithoutToken("/home/productgoods", "get");
}

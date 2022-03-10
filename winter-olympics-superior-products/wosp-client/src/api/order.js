import { requestWithToken } from "@/utils/request";

/**
 * 生成订单
 * @returns {Promise}
 */
export function produceOrder() {
  return requestWithToken("/order/produce", "get");
}

// 创建订单
export function createOrder(orderParams) {
  return requestWithToken("/order/create", "post", orderParams);
}

// 支付订单
export function paymentOrder({ id, payPassword }) {
  return requestWithToken("/order/payment", "post", { id, payPassword });
}

// 取消支付订单
export function cancelOrder(id) {
  return requestWithToken("/order/cancel", "post", { id });
}

// 查询订单
export function inquireOrder(id) {
  return requestWithToken("/order/inquire", "post", { id });
}

// 删除订单
export function delOrder(id) {
  return requestWithToken("/order/delete", "post", { id });
}

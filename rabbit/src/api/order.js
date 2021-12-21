import { requestWithToken } from "@/utils/request";

/**
 * 创建订单
 * @returns {Promise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}

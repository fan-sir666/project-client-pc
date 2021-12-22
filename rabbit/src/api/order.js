import { requestWithToken } from "@/utils/request";

/**
 * 创建订单
 * @returns {Promise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}

/**
 * 添加收货地址
 * @param address 地址信息
 * @returns {Promise}
 */
export function addAddress(address) {
  return requestWithToken("/member/address", "post", address);
}

/**
 * 获取收货地址列表
 * @returns {Promise}
 */
export function getAddressList() {
  return requestWithToken("/member/address", "get");
}

/**
 * 修改收货地址
 * @param id 地址id
 * @param address 详细信息
 * @returns {Promise}
 */
export function modifyAddress({ id, address }) {
  return requestWithToken(`/member/address/${id}`, "put", address);
}

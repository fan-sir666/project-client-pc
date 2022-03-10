import { requestWithToken } from "@/utils/request";

/**
 * 添加收货地址
 * @param addressInfo 地址信息
 * @returns {Promise}
 */
export function addAddress(addressInfo) {
  return requestWithToken("/member/address", "post", addressInfo);
}

/**
 * 获取收货地址列表
 * @returns {Promise}
 */
export function getAddressList() {
  return requestWithToken("/member/getaddress", "get");
}

// 更新地址
export function updateAddress(address) {
  return requestWithToken("/member/updateaddress", "post", address);
}

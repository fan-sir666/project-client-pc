import { requestWithToken } from "@/utils/request";

/**
 * 获取我的收藏数据
 * @param collectType 收藏类型 1商品
 * @param page 页码
 * @param pageSize 显示多少
 * @returns {Promise}
 */
export function getCollection({ collectType = 1, page = 1, pageSize = 10 }) {
  return requestWithToken("/member/collect", "get", {
    collectType,
    page,
    pageSize,
  });
}

/**
 * 获取订单列表
 * @param page 页码
 * @param pageSize 一页显示数据条数
 * @param orderState 订单状态
 * @returns {Promise}
 */
export function getOrderlist({ page, pageSize, orderState }) {
  return requestWithToken("/member/order", "get", {
    page,
    pageSize,
    orderState,
  });
}

/**
 * 取消订单
 * @param id
 * @param cancelReason 取消原因
 * @returns {Promise}
 */
export function cancelOrder({ id, cancelReason }) {
  return requestWithToken(`/member/order/${id}/cancel`, "put", {
    cancelReason,
  });
}

/**
 * 删除订单
 * @param ids
 * @returns {Promise}
 */
export function deleteOrder(ids) {
  return requestWithToken("/member/order", "delete", { ids });
}

/**
 * 确认收货
 * @param id
 * @returns {Promise}
 */
export function confirmReceiptGoods(id) {
  return requestWithToken(`/member/order/${id}/receipt`, "PUT");
}

/**
 * 查看物流
 * @param id
 * @returns {Promise}
 */
export function getLogisticsOrder(id) {
  return requestWithToken(`/member/order/${id}/logistics`, "get");
}

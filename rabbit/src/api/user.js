import { requestWithoutToken } from "@/utils/request";

/**
 * 用户名密码登录
 * @param account 用户名
 * @param password 密码
 * @returns {Promise}
 */
export function userByAccountLogin({ account, password }) {
  return requestWithoutToken("/login", "post", { account, password });
}

/**
 * 获取验证码
 * @param mobile 手机号
 * @returns {Promise}
 */
export function getLoginMsgCode(mobile) {
  return requestWithoutToken("/login/code", "get", { mobile });
}

/**
 * 手机号登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {Promise}
 */
export function userByMobileLogin({ mobile, code }) {
  return requestWithoutToken("/login/code", "post", { mobile, code });
}

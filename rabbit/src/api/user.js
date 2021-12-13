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

// 第三方登录
/**
 * 检索账号是否绑定qq号
 * @param unionId qq用户标识
 * @param source 注册来源
 * @returns {Promise}
 */
export function findAccountByQQOpenid({ unionId, source = 1 }) {
  return requestWithoutToken("/login/social", "post", { unionId, source });
}

/**
 * 获取手机验证码 (有账号但未绑定qq)
 * @param mobile
 * @returns {Promise}
 */
export function getBindMobileMsgCode(mobile) {
  return requestWithoutToken("/login/social/code", "get", { mobile });
}

/**
 * 第三方绑定手机号登录
 * @param unionId
 * @param mobile
 * @param code
 * @returns {Promise}
 */
export function userByQQLogin({ unionId, mobile, code }) {
  return requestWithoutToken("/login/social/bind", "post", {
    unionId,
    mobile,
    code,
  });
}

/**
 * 检测用户名是否唯一
 * @param account
 * @returns {Promise}
 */
export function checkUsernameIsUnique(account) {
  return requestWithoutToken("/register/check", "get", { account });
}

/**
 * 获取手机号验证码 (注册)
 * @param mobile
 * @returns {Promise}
 */
export function getRegisterMsgCode(mobile) {
  return requestWithoutToken("/register/code", "get", { mobile });
}

/**
 * 注册并绑定qq
 * @param unionId
 * @param account
 * @param mobile
 * @param code
 * @param password
 * @returns {AxiosPromise}
 */
export function createNewAccountBindQQ({
  unionId,
  account,
  mobile,
  code,
  password,
}) {
  return requestWithoutToken(`/login/social/${unionId}/complement`, "post", {
    account,
    mobile,
    code,
    password,
  });
}

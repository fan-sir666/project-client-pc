import { requestWithoutToken } from "@/utils/request";

/**
 * 用户注册
 * @param account 用户名
 * @param password 密码
 * @param mobile 手机号
 * @returns {AxiosPromise}
 */
export function userRegister({ account, password, mobile }) {
  return requestWithoutToken("/users/register", "post", {
    username: account,
    password,
    mobile,
  });
}

/**
 * 账号密码登录
 * @param account  用户名
 * @param password 密码
 * @return {AxiosPromise}
 */
export function loginByAccountAndPassword({ account, password }) {
  return requestWithoutToken("/users/accountlogin", "post", {
    username: account,
    password,
  });
}

/**
 * 获取手机验证码
 * @param mobile 手机号
 * @returns {AxiosPromise}
 */
export function getMobileSmsCode(mobile) {
  return requestWithoutToken("/users/smscode", "post", { mobile });
}

/**
 * 手机号 验证码登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {AxiosPromise}
 */
export function loginByMobileAndCode({ mobile, code }) {
  return requestWithoutToken("/users/mobilelogin", "post", { mobile, code });
}

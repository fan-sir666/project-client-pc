import axios from "axios";
import store from "@/store";
import router from "@/router";
// 线上环境: https://apipc-xiaotuxian-front.itheima.net/
// 开发环境: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// 基准地址
export const baseURL = "https://apipc-xiaotuxian-front.itheima.net/";
// 创建携带token的请求实例
const instanceWithToken = axios.create({
  baseURL: baseURL,
});
// 创建不携带token的请求实例
const instanceWithoutToken = axios.create({
  baseURL: baseURL,
});

// 请求拦截器 interceptors(拦截器)
instanceWithToken.interceptors.request.use(
  (config) => {
    //  判断token是否存在
    const token = store.state.user.profile.token;
    if (token) {
      // 请求头添加token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (reason) => {
    return Promise.reject(reason);
  }
);

// 响应拦截器
instanceWithToken.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //  未授权
    if (error.response.status === 401) {
      // 跳转到登录页
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
      //  清空用户信息
      store.commit("user/setUser", {});
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
instanceWithoutToken.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (reason) => {
    return Promise.reject(reason);
  }
);

// 封装请求函数
function generateRequestConfig(url, method, data) {
  return {
    url: url,
    method: method,
    [method === "get" ? "params" : "data"]: data,
  };
}
export function requestWithToken(url, method, data) {
  return instanceWithToken(generateRequestConfig(url, method, data));
}
export function requestWithoutToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}

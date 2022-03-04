import store from "@/store/index";
export default function authGuard(to, from, next) {
  //  指定需要登录的地址
  const requiredLogin = ["cart", "checkout"];
  //  需要登录
  if (requiredLogin.includes(to.path.split("/")[1])) {
    // 未登录
    if (!store.state.user.profile.token) {
      // to.path /checkout/order
      // to.fullPath /checkout/order?a=123 可以接收路由参数
      next({ path: "/login", query: { redirectURL: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
}

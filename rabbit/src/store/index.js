import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "@/store/user";
import cart from "@/store/cart";
import category from "@/store/category";

export default createStore({
  modules: {
    user: user,
    cart: cart,
    category: category,
  },
  plugins: [
    // 持久化存储插件 localStorage
    createPersistedState({
      key: "rabbit",
      //  将vuex哪些模块状态同步到本地
      paths: ["user", "cart"],
    }),
  ],
});

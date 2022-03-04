import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "@/store/user";
import category from "@/store/category";
import cart from "@/store/cart";
const store = createStore({
  modules: {
    user: user,
    category: category,
    cart: cart,
  },
  plugins: [
    // 持久化存储插件 localStorage
    createPersistedState({
      key: "wosp-client",
      //  将vuex哪些模块状态同步到本地
      paths: ["user", "cart"],
    }),
  ],
});
export default store;

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "@/store/user";
const store = createStore({
  modules: {
    user: user,
  },
  plugins: [
    // 持久化存储插件 localStorage
    createPersistedState({
      key: "wosp-client",
      //  将vuex哪些模块状态同步到本地
      paths: ["user"],
    }),
  ],
});
export default store;

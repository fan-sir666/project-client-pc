import { getHeadCategory } from "@/api/home";
import { topCategories } from "@/api/constants";

export default {
  // 使用具有命名空间的 vuex 模块
  namespaced: true,
  state() {
    return {
      // 存储分类列表
      list: topCategories.map((categoryName) => ({ name: categoryName })),
    };
  },
  mutations: {
    // 设置分类列表数据
    setCategories(state, categories) {
      state.list = categories;
    },
  },
  actions: {
    // 获取头部分类导航数据
    async getCategories({ commit }) {
      // 发送请求获取数据
      const { data } = await getHeadCategory();
      // console.log(data);
      // 将数据存储在 vuex 中
      commit("setCategories", data);
    },
  },
};

import { getCategoriesApi } from "@/api/category";
import { topCategories } from "@/api/canstants";

export default {
  namespaced: true,
  state() {
    return {
      // 存储分类列表 默认假数据解决请求数据延长页面渲染闪烁
      list: topCategories.map((item) => ({ name: item })),
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.list = payload;
    },
    // 显示头部导航二级分类
    open(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    async getCategories({ commit }) {
      try {
        const { result } = await getCategoriesApi();
        // console.log(data);
        // 数据处理 js控制导航二级分类 遍历请求得到的数组给每一个对象添加open:Boolean
        result.forEach((item) => (item.open = false));
        //  修改state中的数据
        commit("setCategories", result);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

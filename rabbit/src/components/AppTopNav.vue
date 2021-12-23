<!--  顶部导航行 -->
<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <router-link to="/member/home">
              <i class="iconfont icon-user">{{ user.profile.account }}</i>
            </router-link>
          </li>
          <li><a href="javascript:" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:">
            <i class="iconfont icon-phone">手机版</i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AppTopNav",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 注意: 在取vuex的状态时,取到模块一级 数据是响应式的
    // 在取到具体的值时,我们通过计算属性的方式返回响应式数据
    const user = store.state.user;
    // 退出登录
    const logout = () => {
      store.commit("user/setUser", {});
      store.commit("cart/setCart", []);
      router.push("/login");
    };
    return { user, logout };
  },
};
</script>

<style scoped lang="less">
.app-top-nav {
  background-color: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        display: inline-block;
        padding: 0 15px;
        line-height: 1;
        color: #cdcdcd;
        i {
          margin-right: 2px;
          font-size: 14px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

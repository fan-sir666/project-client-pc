<!-- 顶部通栏 -->
<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <a href="javascript:"
              ><i class="iconfont icon-user"></i>{{ user.profile.account }}</a
            >
          </li>
          <li><a href="javascript:" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><router-link to="/register">免费注册</router-link></li>
        </template>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
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
    // 通过判断用户模块token 切换显示用户名和退出登录
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
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
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

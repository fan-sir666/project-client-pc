<template>
  <LoginHeader>联合登录</LoginHeader>
  <section className="container">
    <nav className="tab">
      <a
        className="active"
        href="javascript:"
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
      >
        <i className="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:"
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
      >
        <i className="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone />
    </div>
    <div class="tab-content" v-if="!hasAccount">
      <LoginCallbackBindPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackBindPatch";
import { ref } from "vue";

export default {
  name: "LoginCallbackPage",
  setup() {
    // 是否关联账号
    const hasAccount = ref(true);
    // 获取QQ登录用户的 openid
    const Login = window.QC.Login;
    // 检测用户的登录状态
    if (Login.check()) {
      // 获取 openid
      Login.getMe((openid) => {
        console.log(openid);
      });
    }
    // 2. 拿着 access_token 向QQ互联发送请求换取用户的openid
    return { hasAccount };
  },
  components: {
    LoginFooter,
    LoginHeader,
    LoginCallbackBindPhone,
    LoginCallbackBindPatch,
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>

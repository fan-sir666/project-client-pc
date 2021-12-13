<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section className="container" v-if="!loading && !isBind">
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
import { provide, ref } from "vue";
import { findAccountByQQOpenid } from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackPage",
  setup() {
    // 切换控制变量
    const hasAccount = ref(true);
    // 是否绑定
    const isBind = ref(false);
    // 加载状态
    const loading = ref(false);
    const openId = ref(null);
    // 登录成功的回调
    const { loginSuccess } = useLoginAfter();
    // 获取QQ登录用户的 openid
    const Login = window.QC.Login;
    // 检测用户的登录状态
    if (Login.check()) {
      // 更新状态
      loading.value = true;
      // 获取 openid
      Login.getMe((openid) => {
        openId.value = openid;
        // 有账号且已绑定qq直接登录
        findAccountByQQOpenid({ unionId: openid })
          .then((data) => {
            loading.value = false;
            isBind.value = true;
            loginSuccess(data);
          })
          .catch(() => {
            loading.value = false;
            isBind.value = false;
          });
      });
    }
    // 向下提供openId
    provide("unionId", openId);
    return { hasAccount, loading, isBind };
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
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
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

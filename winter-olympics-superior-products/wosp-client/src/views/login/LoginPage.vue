<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section className="login-section">
    <div className="wrapper">
      <nav>
        <a
          href="javascript:"
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
          >账户登录</a
        >
        <a
          href="javascript:"
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          >扫码登录</a
        >
      </nav>
      <!-- 登录表单组件 -->
      <LoginForm v-if="activeName === 'account'"></LoginForm>
      <!-- 二维码登录 -->
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:">冬奥优品App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginForm from "@/views/login/components/LoginForm";
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    // account 账号登录
    // qrcode 二维码登录
    const activeName = ref("account");

    return { activeName };
  },
  components: { LoginFooter, LoginHeader, LoginForm },
};
</script>
<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.jpg) no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    .qrcode-box {
      text-align: center;
      padding-top: 40px;

      p {
        margin-top: 20px;

        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;

        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }

        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

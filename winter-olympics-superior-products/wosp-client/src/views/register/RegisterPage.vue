<template>
  <RegisterHeader>欢迎注册</RegisterHeader>
  <section className="login-section">
    <div className="wrapper">
      <nav>
        <a href="javascript:">账户注册</a>
      </nav>
      <!-- 注册表单 -->
      <form @submit="onUserFormSubmit">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              placeholder="请输入用户名"
              v-model="accountField"
            />
          </div>
          <div class="error" v-if="accountError">
            <i class="iconfont icon-warning"></i>{{ accountError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="passwordField"
            />
          </div>
          <div class="error" v-if="passwordError">
            <i class="iconfont icon-warning"></i>{{ passwordError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-phone"></i>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="mobileField"
            />
          </div>
          <div class="error" v-if="mobileError">
            <i class="iconfont icon-warning"></i>{{ mobileError }}
          </div>
        </div>
        <div class="form-item">
          <div class="agree">
            <XtxCheckbox v-model="userIsAgreeField" />
            <span>我已同意</span>
            <a href="javascript:">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:">《服务条款》</a>
          </div>
          <div class="error" v-if="userIsAgreeError">
            <i class="iconfont icon-warning"></i>{{ userIsAgreeError }}
          </div>
        </div>
        <button type="submit" class="btn">注册</button>
      </form>
    </div>
  </section>
  <RegisterFooter></RegisterFooter>
</template>

<script>
import RegisterHeader from "@/views/register/components/RegisterHeader";
import RegisterFooter from "@/views/register/components/RegisterFooter";
import { useField, useForm } from "vee-validate";
import {
  account,
  password,
  mobile,
  isAgree,
} from "@/utils/vee-validate-schema";
import { userRegister } from "@/api/user";
import Message from "@/components/library/Message";
import { useRouter } from "vue-router";
export default {
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const { userFormHandleSubmit, userFormHandleReset, ...userFormValid } =
      useUserFormValidate();
    // 用户名和密码表单提交
    const onUserFormSubmit = userFormHandleSubmit(
      ({ account, password, mobile }) => {
        // console.log({ account, password, mobile });
        userRegister({ account, password, mobile }).then(({ status, msg }) => {
          // console.log(data);
          if (status === 200) {
            Message({ type: "success", text: `请前往登录${msg}` });
            router.push("/login");
          } else {
            Message({ type: "warn", text: `亲,${msg}重新试试` });
          }
        });
      }
    );
    return {
      onUserFormSubmit,
      userFormHandleReset,
      ...userFormValid,
    };
  },
  components: {
    RegisterHeader,
    RegisterFooter,
  },
};
function useUserFormValidate() {
  // 创建表单验证对象
  const {
    handleSubmit: userFormHandleSubmit,
    handleReset: userFormHandleReset,
  } = useForm({
    // 验证规则
    validationSchema: {
      account,
      password,
      mobile,
      isAgree,
    },
  });
  //  逐个验证
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  const { value: userIsAgreeField, errorMessage: userIsAgreeError } =
    useField("isAgree");
  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    mobileField,
    mobileError,
    userIsAgreeField,
    userIsAgreeError,
    userFormHandleSubmit,
    userFormHandleReset,
  };
}
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
    box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 40px;
      a {
        display: inline-block;
        font-size: 18px;
        color: #27ba9b;
        font-weight: bold;
      }
    }
    form {
      padding: 20px 40px 0;
      .form-item {
        margin-bottom: 28px;
        .input {
          position: relative;
          height: 36px;
          i {
            width: 34px;
            height: 34px;
            background: #cfcdcd;
            color: #fff;
            position: absolute;
            left: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 18px;
          }
          input {
            padding-left: 44px;
            border: 1px solid #cfcdcd;
            height: 36px;
            line-height: 36px;
            width: 100%;
          }
        }
        .error {
          position: absolute;
          font-size: 12px;
          line-height: 28px;
          color: #cf4444;
          i {
            font-size: 14px;
            margin-right: 2px;
          }
        }
        .agree {
          margin-left: -45px;
        }
      }
      .btn {
        display: block;
        width: 100%;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: #27ba9b;
        border: none;
      }
    }
  }
}
</style>

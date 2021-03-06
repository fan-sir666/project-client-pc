<template>
  <div className="account-box">
    <div className="toggle">
      <button
        v-if="isMsgLogin"
        @click="
          isMsgLogin = false;
          accountFormHandleReset();
        "
      >
        <i className="iconfont icon-user"></i> 使用账号登录
      </button>
      <button
        v-if="!isMsgLogin"
        @click="
          isMsgLogin = true;
          mobileFormHandleReset();
        "
      >
        <i className="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div className="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form @submit="onAccountFormSubmit">
          <div className="form-item">
            <div className="input">
              <i className="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入用户名"
                v-model="accountField"
              />
            </div>
            <div className="error" v-if="accountError">
              <i className="iconfont icon-warning"></i>{{ accountError }}
            </div>
          </div>
          <div className="form-item">
            <div className="input">
              <i className="iconfont icon-lock"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="passwordField"
              />
            </div>
            <div className="error" v-if="passwordError">
              <i className="iconfont icon-warning"></i>{{ passwordError }}
            </div>
          </div>
          <div className="form-item">
            <div className="agree">
              <XtxCheckbox v-model="accountIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div className="error" v-if="accountIsAgreeError">
              <i className="iconfont icon-warning"></i>{{ accountIsAgreeError }}
            </div>
          </div>
          <button type="submit" className="btn">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-if="isMsgLogin">
        <form @submit="onMobileFormSubmit">
          <div className="form-item">
            <div className="input">
              <i className="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="mobileField"
              />
            </div>
            <div className="error" v-if="mobileError">
              <i className="iconfont icon-warning"></i> {{ mobileError }}
            </div>
          </div>
          <div className="form-item">
            <div className="input">
              <i className="iconfont icon-code"></i>
              <input
                type="password"
                placeholder="请输入验证码"
                v-model="codeField"
              />
              <span className="code" @click="getMsgCode">{{
                isActive ? `剩余${count}秒` : "发送验证码"
              }}</span>
            </div>
            <div className="error" v-if="codeError">
              <i className="iconfont icon-warning"></i>{{ codeError }}
            </div>
          </div>
          <div className="form-item">
            <div className="agree">
              <XtxCheckbox v-model="mobileIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div className="error" v-if="mobileIsAgreeError">
              <i className="iconfont icon-warning"></i>{{ mobileIsAgreeError }}
            </div>
          </div>
          <button type="submit" className="btn">登录</button>
        </form>
      </template>
    </div>
    <div className="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        />
      </a>
      <div className="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import {
  account,
  password,
  isAgree,
  mobile,
  code,
} from "@/utils/vee-validate-schema";
import {
  getLoginMsgCode,
  userByAccountLogin,
  userByMobileLogin,
} from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";

export default {
  name: "LoginForm",
  setup() {
    // 是否显示短信登录
    const isMsgLogin = ref(false);
    // 获取登录成功和失败的回调函数
    const { loginSuccess, loginFailed } = useLoginAfter();
    // 账号登录表单验证
    const {
      accountFormHandleSubmit,
      accountFormHandleReset,
      ...accountFormValid
    } = useAccountFormValidate();
    // 用户名和密码表单提交
    const onAccountFormSubmit = accountFormHandleSubmit(
      ({ account, password }) => {
        // console.log({ account, password });
        userByAccountLogin({ account, password })
          .then(loginSuccess)
          .catch(loginFailed);
      }
    );
    // 手机号表单登录验证
    const {
      mobileFormHandleSubmit,
      mobileFormHandleReset,
      mobileIsValidate,
      ...mobileFormValid
    } = useMobileFormValidate();
    // 手机号验证码提交
    const onMobileFormSubmit = mobileFormHandleSubmit(({ mobile, code }) => {
      // console.log(values);
      userByMobileLogin({ mobile, code }).then(loginSuccess).catch(loginFailed);
    });
    // 获取倒计时属性和方法
    const { count, isActive, start } = useCountDown();
    // 获取手机验证码
    const getMsgCode = async () => {
      // 单独校验手机号
      let { isValid, mobile } = await mobileIsValidate();
      // console.log(isValid, mobile);
      // 手机号正确 倒计时未开启
      if (isValid && !isActive.value) {
        try {
          // 获取验证码
          await getLoginMsgCode(mobile);
          Message({ type: "success", text: "验证码发送成功" });
          //  倒计时
          start(60);
        } catch (err) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
    };
    return {
      isMsgLogin,
      onAccountFormSubmit,
      accountFormHandleReset,
      ...accountFormValid,
      onMobileFormSubmit,
      mobileFormHandleReset,
      ...mobileFormValid,
      getMsgCode,
      count,
      isActive,
    };
  },
};
// 账号登录表单验证
function useAccountFormValidate() {
  // 创建表单验证对象
  const {
    handleSubmit: accountFormHandleSubmit,
    handleReset: accountFormHandleReset,
  } = useForm({
    // 验证规则
    validationSchema: {
      account,
      password,
      isAgree,
    },
  });
  //  逐个验证
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: accountIsAgreeField, errorMessage: accountIsAgreeError } =
    useField("isAgree");
  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountIsAgreeField,
    accountIsAgreeError,
    accountFormHandleSubmit,
    accountFormHandleReset,
  };
}
// 手机号登录表单验证
function useMobileFormValidate() {
  const {
    handleSubmit: mobileFormHandleSubmit,
    handleReset: mobileFormHandleReset,
  } = useForm({
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: mobileIsAgreeField, errorMessage: mobileIsAgreeError } =
    useField("isAgree");

  // 单独验证是否输入手机号
  const mobileIsValidate = async () => {
    let { valid } = await mobileValidate();
    return { isValid: valid, mobile: mobileField.value };
  };
  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    mobileIsAgreeField,
    mobileIsAgreeError,
    mobileFormHandleSubmit,
    mobileFormHandleReset,
    mobileIsValidate,
  };
}
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
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
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        .code.disabled {
          cursor: wait;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          class="input"
          type="text"
          v-model="accountField"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          v-model="mobileField"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          v-model="codeField"
          placeholder="请输入验证码"
        />
        <span class="code" @click="getMsgCode">{{
          isActive ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          v-model="passwordField"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          v-model="rePasswordField"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/vee-validate-schema";
import { createNewAccountBindQQ, getRegisterMsgCode } from "@/api/user";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";
import { inject } from "vue";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPatch",
  setup() {
    // 获取unionId
    const unionId = inject("unionId");
    // 获取成功和失败的回调
    const { loginSuccess, loginFailed } = useLoginAfter();
    const { handleSubmit, getMobileIsValidate, ...remain } = useRegisterPatch();
    const onSubmit = handleSubmit(
      ({ checkUserAccount, mobile, code, password }) => {
        createNewAccountBindQQ({
          unionId: unionId.value,
          account: checkUserAccount,
          mobile,
          code,
          password,
        })
          .then(loginSuccess)
          .catch(loginFailed);
      }
    );
    // 获取倒计时
    const { count, isActive, start } = useCountDown();
    // 获取手机号验证码
    const getMsgCode = async () => {
      // 是否通过校验
      const { isValid, mobile } = await getMobileIsValidate();
      if (isValid && !isActive.value) {
        try {
          //  请求发送验证码
          await getRegisterMsgCode(mobile);
          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        } catch (err) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
    };
    return { onSubmit, ...remain, getMsgCode, count, isActive };
  },
};
// 表单验证
function useRegisterPatch() {
  // 验证对象
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      mobile,
      code,
      rePassword,
      password,
    },
  });
  // 逐个校验
  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");

  // 单独验证手机号
  const getMobileIsValidate = async () => {
    const { valid } = await validate();
    return { isValid: valid, mobile: mobileField.value };
  };
  return {
    handleSubmit,
    accountField,
    accountError,
    mobileField,
    mobileError,
    codeField,
    codeError,
    passwordField,
    passwordError,
    rePasswordField,
    rePasswordError,
    getMobileIsValidate,
  };
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>

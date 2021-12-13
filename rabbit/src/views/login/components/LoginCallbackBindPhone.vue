<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          v-model="mobileField"
          placeholder="绑定的手机号"
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
          placeholder="短信验证码"
        />
        <span class="code" @click="getMsgCode">{{
          isActive ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { code, mobile } from "@/utils/vee-validate-schema";
import Message from "@/components/library/Message";
import { getBindMobileMsgCode, userByQQLogin } from "@/api/user";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPhone",
  setup() {
    // qq信息
    const { nickname, avatar } = getQQUserInfo();
    // 获取unionId
    const unionId = inject("unionId");
    // 获取成功和失败的回调
    const { loginSuccess, loginFailed } = useLoginAfter();
    // 表单验证
    const { handleSubmit, getMobileIsValidate, ...remain } =
      useBindPhoneFormValid();
    // 表单提交
    const onSubmit = handleSubmit(({ mobile, code }) => {
      userByQQLogin({ unionId: unionId.value, mobile, code })
        .then(loginSuccess)
        .catch(loginFailed);
    });
    // 获取倒计时
    const { count, isActive, start } = useCountDown();
    // 获取手机验证码
    const getMsgCode = async () => {
      const { isValid, mobile } = await getMobileIsValidate();
      if (isValid && !isActive.value) {
        try {
          // 请求发送验证码
          await getBindMobileMsgCode(mobile);
          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        } catch (err) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
    };
    return {
      nickname,
      avatar,
      onSubmit,
      ...remain,
      getMsgCode,
      count,
      isActive,
    };
  },
};
// 获取qq用户信息
function getQQUserInfo() {
  // qq昵称
  const nickname = ref("");
  // qq头像
  const avatar = ref("");
  // qq互联对象
  const QC = window.QC;
  if (QC.Login.check()) {
    QC.api("get_user_info").success(({ data }) => {
      nickname.value = data.nickname;
      avatar.value = data.figureurl_1;
    });
  }

  return { nickname, avatar };
}
// 表单验证
function useBindPhoneFormValid() {
  // 验证对象
  const { handleSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
    },
  });
  // 逐个校验
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 单独验证手机号
  const getMobileIsValidate = async () => {
    // 是否通过验证 valid
    const { valid } = await validate();
    return { isValid: valid, mobile: mobileField.value };
  };
  return {
    handleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    getMobileIsValidate,
  };
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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

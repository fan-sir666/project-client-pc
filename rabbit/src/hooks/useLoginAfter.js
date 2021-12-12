import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";

export default function useLoginAfter() {
  const store = useStore();
  const router = useRouter();
  //  登录成功
  const loginSuccess = ({ result }) => {
    //  存储用户信息
    const userInfo = {
      // 用户id
      id: result.id,
      // 用户头像
      avatar: result.avatar,
      // 用户昵称
      nickname: result.nickname,
      // 用户账号
      account: result.account,
      // 用户手机号
      mobile: result.mobile,
      // 用户登录凭证
      token: result.token,
    };
    store.commit("user/setUser", userInfo);
    //  跳转页面
    router.push("/").then(() => {
      Message({ type: "success", text: "登录成功" });
    });
  };
  //  登录失败
  const loginFailed = (error) => {
    Message({ type: "error", text: error.response.data.message });
  };
  return { loginSuccess, loginFailed };
}

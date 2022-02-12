import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";

export default function useLoginAfter() {
  const store = useStore();
  const router = useRouter();
  //  登录成功
  const loginSuccess = ({ status, data, message }) => {
    // console.log(data);
    if (status === 401) return Message({ type: "warn", text: message });
    //  存储用户信息
    const userInfo = {
      // 用户id
      id: data.id,
      // 用户头像
      avatar: data.avatar,
      // 用户昵称
      nickname: data.nickname,
      // 用户账号
      account: data.username,
      // 用户手机号
      mobile: data.mobile,
      // 用户登录凭证
      token: data.token,
    };
    store.commit("user/setUser", userInfo);
    //  跳转页面
    router.push("/").then(() => {
      Message({ type: "success", text: message });
    });
  };
  //  登录失败
  // const loginFailed = (error) => {
  //   Message({ type: "error", text: error.response.data.message });
  // };
  return { loginSuccess };
}

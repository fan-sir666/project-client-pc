import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

// 数据懒加载函数
export default function useLazyData(apiFn) {
  // 监听的元素
  const target = ref(null);
  // 请求的数据
  const result = ref(null);
  /**
   * 监听元素是否进入可视区
   * 参数:
   *    ① 监听元素 target
   *    ②回调函数 ([{ isIntersecting }]) => {} isIntersecting是否进入
   *    ③配置对象{ threshold: 0 } threshold为0一开始就监听
   */
  const { stop } = useIntersectionObserver(
    target,
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        //  停止监听
        stop();
        //  请求数据
        try {
          const { data } = await apiFn();
          result.value = data;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    { threshold: 0 }
  );
  return { target, result };
}

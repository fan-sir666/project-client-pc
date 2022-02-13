import { onUnmounted, ref } from "vue";
import { useIntervalFn } from "@vueuse/core";

export default function useCountDown() {
  const count = ref(0);
  // 定时器 pause清除 resume开启 isActive是否正在执行
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (count.value <= 0) {
        // 停止
        pause();
      } else {
        count.value--;
      }
    },
    1000,
    {
      immediate: false,
    }
  );
  // 控制定时的开始和结束
  const start = (value) => {
    // 如果当前定时器未执行
    if (!isActive.value) {
      count.value = value;
      // 开启
      resume();
    }
  };
  // 组件卸载后清除定时器
  onUnmounted(pause);
  return { count, isActive, start };
}

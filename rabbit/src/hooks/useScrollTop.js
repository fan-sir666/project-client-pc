import { onMounted, onUnmounted, ref } from "vue";

export default function useScrollTop() {
  // 滚动距离
  const scrollTop = ref(0);
  const onScrollHandler = () => {
    //  获取滚动距离
    scrollTop.value = document.documentElement.scrollTop;
  };
  onMounted(() => {
    //  添加滚动事件
    window.addEventListener("scroll", onScrollHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScrollHandler);
  });
  return scrollTop;
}

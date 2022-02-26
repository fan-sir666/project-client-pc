/*懒加载图片指令*/

// 导入默认产品图片
import defaultImage from "@/assets/images/200.png";
const lazy = {
  mounted(el, binding) {
    //  创建元素监听对象
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        //  停止监听
        observer.unobserve(el);
        //  动态加载图片
        el.src = binding.value;
        //  图片加载错误
        el.onerror = () => {
          el.src = defaultImage;
        };
      }
    });
    //  指定要监听的元素
    observer.observe(el);
  },
};
export default lazy;

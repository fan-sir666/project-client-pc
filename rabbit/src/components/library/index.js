import XtxSkeleton from "@/components/library/XtxSkeleton";
import XtxCarousel from "@/components/library/XtxCarousel";
import XtxMore from "@/components/library/XtxMore";

export default {
  // 注册应用级全局组件
  install(app) {
    // 骨架屏组件
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看更多组件
    app.component(XtxMore.name, XtxMore);
  },
};

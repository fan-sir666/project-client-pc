// js方式渲染VUE组件

// 导入消息提示组件
import XtxMessage from "@/components/library/XtxMessage";
import { createVNode, render } from "vue";

// 创建组件渲染的目标容器
const container = document.createElement("div");
document.body.appendChild(container);
let timer = null;
export default function Message({ type, text }) {
  //  将组件转为虚拟DOM节点对象
  const vNode = createVNode(XtxMessage, { type, text });
  //  将虚拟节点对象渲染到目标容器中
  render(vNode, container);
  // 销毁组件
  clearTimeout(timer);
  timer = setTimeout(() => {
    vNode.component.proxy.show = false;
    container._vnode = null;
  }, 2000);
}

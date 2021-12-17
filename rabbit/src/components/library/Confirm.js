import XtxConfirm from "@/components/library/XtxConfirm";
import { createVNode, render } from "vue";

// 创建渲染目标容器
const container = document.createElement("div");
document.body.appendChild(container);
// 返回Promise
export default function Confirm({ title = "温馨提示", content }) {
  return new Promise((resolve, reject) => {
    const onSureButtonClickHandler = () => {
      resolve();
      vNode.el.classList.remove("fade");
      vNode.el.children[0].classList.remove("fade");
      setTimeout(() => {
        render(null, container);
      }, 400);
    };
    const onCancelButtonClickHandler = () => {
      reject();
      vNode.el.classList.remove("fade");
      vNode.el.children[0].classList.remove("fade");
      setTimeout(() => {
        render(null, container);
      }, 400);
    };
    //  单组件转化为虚拟DOM对象
    const vNode = createVNode(XtxConfirm, {
      title,
      content,
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    render(vNode, container);
    setTimeout(() => {
      vNode.el.classList.add("fade");
      vNode.el.children[0].classList.add("fade");
    }, 0);
  });
}
// export default function Confirm({
//   title = "温馨提示",
//   content,
//   onSureButtonClick,
//   onCancelButtonClick,
// }) {
//   const onSureButtonClickHandler = () => {
//     onSureButtonClick();
//     render(null, container);
//   };
//   const onCancelButtonClickHandler = () => {
//     onCancelButtonClick();
//     render(null, container);
//   };
//   //  单组件转化为虚拟DOM对象
//   const vNode = createVNode(XtxConfirm, {
//     title,
//     content,
//     onSureButtonClick: onSureButtonClickHandler,
//     onCancelButtonClick: onCancelButtonClickHandler,
//   });
//   render(vNode, container);
// }

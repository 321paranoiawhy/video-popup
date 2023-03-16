import { h, render } from "vue";

// import Popup from "./Popup.vue";
import NewPopup from "./NewPopup.vue";

import { PopupType } from "../types/index";

const renderPopup = (props: PopupType): void => {
    const container = document.createElement("div");
    // 创建虚拟 dom
    // const vNode = h(Popup, props);
    const vNode = h(NewPopup, props);
    // const vNode = h("div", [true ? h("div", "yes") : h("span", "no")]);
    render(vNode, container);
    const popupDOM = container.firstElementChild as HTMLDivElement;
    popupDOM.onclick = (e) => {
        // console.log(e.target);
        const target = e.target as HTMLElement;
        const conditionA =
            target.nodeName.toLowerCase() === "div" &&
            target.classList.contains("popup-wrapper");
        const conditionB =
            target.nodeName.toLowerCase() === "img" &&
            target.classList.contains("close");
        // 点击了关闭按钮或者弹窗以外部分, 关闭当前弹窗
        if (conditionA || conditionB) {
            popupDOM.remove();
        }
    };

    document.querySelector("#app")?.appendChild(popupDOM);
};

export default renderPopup;

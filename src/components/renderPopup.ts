import { h, render } from "vue";

// import Popup from "./Popup.vue";
import NewPopup from "./NewPopup.vue";

import { PopupType } from "../types/index";

const renderPopup = (props: PopupType): void => {
    const container = document.createElement("div");
    // const className = `popup-${props.zIndex}`;
    // container.className = className;
    // container.style.zIndex = String(props.zIndex);

    // container.onclick = (e) => {
    //     const target = e.target as HTMLDivElement;
    //     // 点击了关闭按钮, 关闭当前弹窗
    //     if (
    //         target.nodeName.toLowerCase() === "img" &&
    //         target.classList.contains("close")
    //     ) {
    //         container.remove();
    //     }
    // };

    // 创建虚拟 dom
    // const vNode = h(Popup, props);
    const vNode = h(NewPopup, props);
    // const vNode = h("div", [true ? h("div", "yes") : h("span", "no")]);
    console.log(vNode);
    render(vNode, container);
    const popupDOM = container.firstElementChild as HTMLDivElement;
    popupDOM.onclick = (e) => {
        const target = e.target as HTMLElement;
        // 点击了关闭按钮, 关闭当前弹窗
        if (
            target.nodeName.toLowerCase() === "img" &&
            target.classList.contains("close")
        ) {
            popupDOM.remove();
        }
    };

    // document.querySelector("#app")?.appendChild(container);
    document.querySelector("#app")?.appendChild(popupDOM);
};

export default renderPopup;

<template>
    <transition name="fade">
        <!-- 遮罩层 -->
        <div class="popup-wrapper">
            <!-- header + main -->
            <div class="popup-container" :style="{ 'z-index': props.zIndex }">
                <!-- <header>
                    <img
                        src="/IcRoundArrowBackIos.svg"
                        alt=""
                        @click="onBack"
                    />
                    <div>
                        Tips (<span class="current-tip">{{ currentTip }}</span>
                        / <span class="totalTips">{{ props.totalTips }}</span
                        >)
                    </div>
                    <img
                        src="/IcRoundArrowForwardIos.svg"
                        alt=""
                        @click="onForward"
                    />
                    <img
                        class="close"
                        src="/IcRoundClose.svg"
                        alt=""
                        @click="onClose"
                    />
                </header> -->

                <img
                    class="close"
                    src="/IcRoundClose.svg"
                    alt=""
                    @click="onClose"
                />

                <main @click="onClickContent">
                    <!-- <div>问: </div> -->
                    <!-- <div>答: </div> -->
                    <!-- <div v-for="item in props.content[currentTip - 1].content">{{ item }}</div> -->
                    <div
                        v-for="item in props.content[currentTip - 1].content"
                        v-html="item"
                    ></div>
                    <!-- {{ props.content[currentTip - 1].content }} -->

                    <!-- <div>
                        <div class="fireworks" style="left: 15%; top: 5%"></div>
                        <div
                            class="fireworks"
                            style="right: 30%; top: 13%; animation-delay: -0.4s"
                        ></div>
                        <div
                            class="fireworks"
                            style="left: 5%; top: 23%; animation-delay: -1.7s"
                        ></div>
                        <div
                            class="fireworks"
                            style="right: 45%; top: 8%; animation-delay: -3.1s"
                        ></div>
                    </div> -->
                    <!-- <Fireworks></Fireworks> -->
                </main>
                <!-- <div></div> -->
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { getPopupZIndex } from "../utils/popupZIndex";

import renderPopup from "./renderPopup";

import Fireworks from "./Fireworks.vue";

import { pauseAllVideos } from "../utils/pauseAllVideos";

interface PopupProperties {
    // showPopup: boolean; // 必传
    zIndex: number;
    totalTips?: number; // 总信息数量
    currentTip?: number; // 当前信息: 1 ~ totalTips
    content?: any; // 内容
    contentType?: string; // 内容类型, 如 img / richtext / video
}

const props = withDefaults(defineProps<PopupProperties>(), {
    // showPopup: true,
    totalTips: 4,
    currentTip: 1,
});

const emit = defineEmits(["close"]);

const currentTip = ref(props.currentTip);

const onBack = () => {
    if (currentTip.value > 1) {
        currentTip.value--;
    }
};
const onForward = () => {
    if (currentTip.value < props.totalTips) {
        currentTip.value++;
    }
};

const onClickContent = () => {
    // console.log("onClickContent", __popupZIndex__);
    const children = props.content[currentTip.value - 1].children;
    // console.log(children, 999);
    if (!children.length) {
        return;
    }
    pauseAllVideos();
    const currentPopupZIndex = getPopupZIndex();
    renderPopup({
        // showPopup: true,
        zIndex: currentPopupZIndex,
        // totalTips: 7,
        totalTips: children.length,
        currentTip: 1,
        content: children,
        // content: [
        //     {
        //         content: "第一条",
        //         children: [
        //             { content: "第一条的第一条" },
        //             { content: "第一条的第二条" },
        //         ],
        //     },
        //     { content: "第二条", children: [] },
        //     { content: "第三条", children: [] },
        //     { content: "第四条", children: [] },
        //     { content: "第五条", children: [] },
        //     { content: "第六条", children: [] },
        //     { content: "第七条", children: [] },
        // ],
    });
};

const onClose = () => {
    // emit("update:showPopup", false);
    emit("close", false);
};
</script>

<style lang="scss" scoped>
// 动画过渡效果
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
    transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
}

.popup-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
}
.popup-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 80%;
    position: fixed;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    inset: 0;
    margin: auto;
    background-color: #fff;
}
header {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    justify-content: center;
    column-gap: 1rem;
    padding: 1rem;
    & img {
        width: 32px;
        height: 32px;
        cursor: pointer;
        user-select: none;
        &.close {
            position: absolute;
            top: 1rem;
            right: 10px;
        }
    }
    & span.current-tip {
        color: red;
    }
}
main {
    flex: 1;
    text-align: center;
    margin-top: calc(1rem + 32px);
    // & div {
    //     padding: 1rem;
    // }
    overflow-y: auto;
}
header,
main {
    // z-index 继承自 .popup-container
    z-index: inherit;
}

img.close {
    position: absolute;
    top: 1rem;
    right: 10px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    user-select: none;
}

// 烟花动效
.fireworks {
    position: absolute;
    width: 150px;
    height: 150px;
    /*     padding-bottom: 100px; */
    background: url("https://imgservices-1252317822.image.myqcloud.com/image/081320210201435/e9951400.png")
        right top no-repeat;
    background-size: auto 150px;
    animation: fireworks 2s steps(24) infinite, random 8s steps(1) infinite;
}
@keyframes fireworks {
    0% {
        background-position: 0%;
    }
    50%,
    100% {
        background-position: 100% 100%;
    }
}

@keyframes random {
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(200%, 50%) scale(0.8);
    }
    50% {
        transform: translate(80%, 80%) scale(1.2);
    }
    75% {
        transform: translate(20%, 60%) scale(0.65);
    }
}
@media screen and (prefers-reduced-motion) {
    /* 禁用不必要的动画 */
    .fireworks {
        animation: none;
    }
}
</style>

<template>
    <transition name="fade">
        <!-- 遮罩层 -->
        <div class="popup-wrapper" @click="onClickOutside">
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
                        class="question-root"
                        v-if="props.content[currentTip - 1].isQuestion"
                    >
                        <div class="callout-title">
                            <!-- <div class="callout-icon"> -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="svg-icon lucide-help-circle"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path
                                    d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                                ></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <!-- </div> -->
                            <div class="callout-title-inner">问题</div>
                        </div>
                        <div
                            class="callout-content"
                            v-html="props.content[currentTip - 1].content"
                        ></div>
                    </div>

                    <div
                        class="answer-root"
                        v-if="props.content[currentTip - 1].isAnswer"
                    >
                        <div class="callout-title">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="svg-icon lucide-check"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <div class="callout-title-inner">答案</div>
                        </div>
                        <div
                            class="callout-content"
                            v-html="props.content[currentTip - 1].content"
                        ></div>
                    </div>

                    <video
                        v-if="props.content[currentTip - 1].isVideo"
                        controls
                        preload="auto"
                        :src="props.content[currentTip - 1].content"
                    ></video>

                    <!-- <div
                        v-for="item in props.content[currentTip - 1].content"
                        v-html="item"
                    ></div> -->

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

// import Fireworks from "./Fireworks.vue";

import { pauseAllVideos } from "../utils/pauseAllVideos";

interface PopupProperties {
    zIndex: number;
    totalTips?: number; // 总信息数量
    currentTip?: number; // 当前信息: 1 ~ totalTips
    content?: any; // 内容
    contentType?: string; // 内容类型, 如 img / richtext / video
}

const props = withDefaults(defineProps<PopupProperties>(), {
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

const onClickOutside = (e: Event) => {
    const target = e.target as HTMLElement;
    const conditionA =
        target.nodeName.toLowerCase() === "div" &&
        target.classList.contains("popup-wrapper");
    if (conditionA) {
        emit("close", false);
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
@import url(../css/QuestionCallout.css);
@import url(../css/AnswerCallout.css);
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
    // text-align: center;
    margin-top: calc(1rem + 32px);
    // & div {
    //     padding: 1rem;
    // }
    overflow-y: auto;
    & video {
        width: 95%;
        // height: 95%;
        display: block;
        margin: auto;
    }
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
</style>

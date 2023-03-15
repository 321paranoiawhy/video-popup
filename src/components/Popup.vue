<template>
    <transition name="fade">
        <!-- 遮罩层 -->
        <div class="popup-wrapper">
            <!-- header + main -->
            <div class="popup-container" :style="{ 'z-index': props.zIndex }">
                <header>
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
                </header>
                <main @click="onClickContent">
                    <!-- <div>问: </div> -->
                    <!-- <div>答: </div> -->
                    <!-- <div v-for="item in props.content[currentTip - 1].content">{{ item }}</div> -->
                    <div v-for="item in props.content[currentTip - 1].content" v-html="item"></div>
                    <!-- {{ props.content[currentTip - 1].content }} -->
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

interface PopupProperties {
    // showPopup: boolean; // 必传
    zIndex: number;
    totalTips?: number; // 总信息数量
    currentTip?: number; // 当前信息: 1 ~ totalTips
    content?: any; // 内容
    contentType?: string; // 内容类型, 如 img / richtext / video
}

const mockContent = [
    {
        content: "谁是作者?",
        children: [
            { content: "作者左左佑佑", children: [] },
            // { content: "1.2", children: [] },
        ],
    },
    {
        content: "什么是爱牙日?",
        children: [
            {
                content:
                    "全国爱牙日（Chinas Teeth Care Day）于1989年设立，每年的9月20日为（中国）全国爱牙日。 建立“全国爱牙日”是中国开展群众性口腔健康教育活动的一个创举，是推动中国牙病预防保健事业发展的一项重要举措。",
                children: [
                    {
                        content: "爱牙日由来?",
                        children: [
                            {
                                content:
                                    "爱牙日的宗旨是通过爱牙日活动，广泛动员社会的力量 ， 在群众中进行牙病防治知识的普及教育，增强口腔键康观念和自我口腔保健的意识 ， 建立口腔保健行为，从而提高全民族的口腔健康水平 。",
                                children: [],
                            },
                        ],
                    },
                    // { content: "2.1.2", children: [] },
                    // { content: "2.1.3", children: [] },
                    // { content: "2.1.4", children: [] },
                    // { content: "2.1.5", children: [] },
                ],
            },
            {
                content: "什么是蛀牙?",
                children: [
                    {
                        content: "蛀牙又称为虫牙, 口腔医学称之为龋齿。",
                        children: [
                            {
                                content: "为什么会蛀牙?",
                                children: [
                                    {
                                        content:
                                            "龋齿一种由口腔中多种因素复合作用所导致的牙齿硬组织进行性病损，表现为无机质脱矿和有机质的分解，随病程发展而从色泽改变到形成实质性病损的演变过程。",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                content: "牙刷",
                children: [
                    {
                        content:
                            "https://detail.tmall.com/item_o.htm?id=580563547620",
                        children: [],
                    },
                ],
            },
            // { content: "2.4", children: [] },
        ],
    },
    { content: "3", children: [] },
    { content: "4", children: [] },
    { content: "5", children: [] },
];

const props = withDefaults(defineProps<PopupProperties>(), {
    // showPopup: true,
    totalTips: 4,
    currentTip: 1,
    content: [
        {
            content: "1",
            children: [
                { content: "1.1", children: [] },
                { content: "1.2", children: [] },
            ],
        },
        {
            content: "2",
            children: [
                {
                    content: "2.1",
                    children: [
                        { content: "2.1.1", children: [] },
                        { content: "2.1.2", children: [] },
                        { content: "2.1.3", children: [] },
                        { content: "2.1.4", children: [] },
                        { content: "2.1.5", children: [] },
                    ],
                },
                { content: "2.2", children: [] },
                { content: "2.3", children: [] },
                // { content: "2.4", children: [] },
            ],
        },
        { content: "3", children: [] },
        { content: "4", children: [] },
        { content: "5", children: [] },
    ],
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
    & div {
        padding: 1rem;
    }
}
header,
main {
    // z-index 继承自 .popup-container
    z-index: inherit;
}
</style>

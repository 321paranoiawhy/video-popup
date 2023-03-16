<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from "vue";
// import Popup from "./components/Popup.vue";

import { getPopupZIndex } from "./utils/popupZIndex";

import mockJSON from "./mock/little_bear_and_his_mom.json";

const currentPopupZIndex = getPopupZIndex();

const showPopup = ref(false);

const onPopup = () => {
    showPopup.value = true;
};

const onPopupClose = () => {
    showPopup.value = false;
    temp = 0.5;
    // 重新播放视频
    isVideoPaused.value = false;
    videoDOM.value.play();
};

// document.onkeydown = (e) => {
//     if (e.keyCode === 32 || e.which === 32) {
//         const video = document.querySelectorAll("video");
//         const lastVideo = video[video.length - 1];
//         if (lastVideo.paused) {
//             lastVideo.play();
//         } else {
//             lastVideo.pause();
//         }
//     }
// };

const videoDOM = ref();

const timeline = ref<any>([]);

let temp = 0;

const onTimeupdate = () => {
    const currentTime = videoDOM.value.currentTime + temp;
    const index = mockContent.findIndex(
        (item) => Math.abs(item.time - currentTime) <= 0.15
    );

    // console.log(currentTime, index);

    if (index >= 0 && index < mockContent.length) {
        timeline.value = [mockContent[index]];
        // 暂停播放视频
        videoDOM.value.pause();
        showPopup.value = true;
    }
};

// const mockContent = mockJSON;
const mockContent = mockJSON.sort((a, b) => a.time - b.time);

const onVideoPause = () => {
    isVideoPaused.value = true;
};

const onVideoPlay = () => {
    isVideoPaused.value = false;
};

const onClickPlayIcon = () => {
    if (videoDOM.value.paused) {
        isVideoPaused.value = false;
        videoDOM.value.play();
    } else {
        isVideoPaused.value = true;
        videoDOM.value.pause();
    }
};

const isVideoPaused = ref(true);

// const isVideoPaused = computed(() => {
//     // if (videoDOM.value && videoDOM.value.paused) {
//     //     return true;
//     // } else {
//     //     return false;
//     // }
//     return Boolean(videoDOM.value && videoDOM.value.paused);
// });

// const mockContent = [
//     {
//         time: 1,
//         content: ["问: 谁是作者?"],
//         children: [
//             { content: ["答: 作者左左佑佑"], children: [] },
//             // { content: "1.2", children: [] },
//         ],
//     },
//     {
//         time: 6,
//         content: ["问: 什么是爱牙日?"],
//         children: [
//             {
//                 content: [
//                     "答: 全国爱牙日 (Chinas Teeth Care Day) 于 1989 年设立, 每年的 9 月 20 日为 (中国）全国爱牙日。 建立“全国爱牙日”是中国开展群众性口腔健康教育活动的一个创举，是推动中国牙病预防保健事业发展的一项重要举措。",
//                     "问: 爱牙日由来?",
//                 ],
//                 children: [
//                     {
//                         content: [
//                             "答: 爱牙日的宗旨是通过爱牙日活动，广泛动员社会的力量, 在群众中进行牙病防治知识的普及教育，增强口腔键康观念和自我口腔保健的意识, 建立口腔保健行为，从而提高全民族的口腔健康水平。",
//                         ],
//                         children: [
//                             // {
//                             //     content:
//                             //         "爱牙日的宗旨是通过爱牙日活动，广泛动员社会的力量 ， 在群众中进行牙病防治知识的普及教育，增强口腔键康观念和自我口腔保健的意识 ， 建立口腔保健行为，从而提高全民族的口腔健康水平 。",
//                             //     children: [],
//                             // },
//                         ],
//                     },
//                     // { content: "2.1.2", children: [] },
//                     // { content: "2.1.3", children: [] },
//                     // { content: "2.1.4", children: [] },
//                     // { content: "2.1.5", children: [] },
//                 ],
//             },

//             // { content: "2.4", children: [] },
//         ],
//     },
//     {
//         time: 10,
//         content: ["问: 什么是蛀牙?"],
//         children: [
//             {
//                 content: [
//                     "答: 蛀牙又称为虫牙, 口腔医学称之为龋齿。",
//                     "问: 为什么会蛀牙?",
//                 ],
//                 children: [
//                     {
//                         content: [
//                             "答: 龋齿一种由口腔中多种因素复合作用所导致的牙齿硬组织进行性病损，表现为无机质脱矿和有机质的分解，随病程发展而从色泽改变到形成实质性病损的演变过程。",
//                         ],
//                         children: [
//                             // {
//                             //     content:
//                             //         "龋齿一种由口腔中多种因素复合作用所导致的牙齿硬组织进行性病损，表现为无机质脱矿和有机质的分解，随病程发展而从色泽改变到形成实质性病损的演变过程。",
//                             //     children: [],
//                             // },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         time: 15,
//         content: ["牙刷"],
//         children: [
//             {
//                 content: [
//                     "<a href='https://detail.tmall.com/item_o.htm?id=580563547620' target='_blank'>牙刷推荐 1</a>",
//                     "<a href='https://detail.tmall.com/item_o.htm?id=580563547620' target='_blank'>牙刷推荐 2</a>",
//                     "<a href='https://detail.tmall.com/item_o.htm?id=580563547620' target='_blank'>牙刷推荐 3</a>",
//                 ],
//                 children: [],
//             },
//         ],
//     },
//     // { content: "3", children: [] },
//     // { content: "4", children: [] },
//     // { content: "5", children: [] },
// ];
</script>

<template>
    <!-- <div @click="onPopup">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
        consectetur, doloremque totam rerum repellendus, quas officia
        consequuntur sequi ratione officiis cumque molestias alias recusandae
        amet, pariatur fuga voluptatem omnis similique?
    </div> -->

    <div class="app-root">
        <video
            src="./assets/little_bear_and_his_mom.mp4"
            controls
            preload="auto"
            ref="videoDOM"
            @timeupdate="onTimeupdate"
            @pause="onVideoPause"
            @play="onVideoPlay"
        ></video>

        <img
            v-if="isVideoPaused"
            src="/MaterialSymbolsPlayCircleOutlineRounded.svg"
            alt=""
            class="play-icon"
            @click="onClickPlayIcon"
        />
    </div>

    <!-- <iframe
        src="https://www.bilibili.com/video/BV19y4y1Z7Qr/"
        frameborder="0"
    ></iframe> -->

    <!-- <Popup
        @close="onPopupClose"
        v-if="showPopup"
        :zIndex="currentPopupZIndex"
        :content="mockContent"
    ></Popup> -->

    <!-- <NewPopup
        @close="onPopupClose"
        v-if="showPopup"
        :zIndex="currentPopupZIndex"
        :content="mockContent"
    ></NewPopup> -->

    <NewPopup
        @close="onPopupClose"
        v-if="showPopup"
        :zIndex="currentPopupZIndex"
        :content="timeline"
    ></NewPopup>
</template>

<style scoped>
.app-root {
    position: absolute;
    /* top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
video {
    display: block;
    /* margin: 1rem auto; */
    width: 100vw;
    /* height: 100vh; */
}
.play-icon {
    width: 128px;
    height: 128px;
    position: absolute;
    inset: 0;
    margin: auto;
    cursor: pointer;
    user-select: none;
}
</style>

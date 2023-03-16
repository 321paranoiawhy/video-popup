<template>
    <div class="root">
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
        <div class="callout-content" v-html="props.content"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    content: String,
});
</script>

<style lang="scss" scoped>
.root {
    padding: 12px 12px 12px 24px;
    margin: 16px auto;
    width: 80%;
    background-color: rgba(8, 185, 78, 0.1);
    & .callout-title {
        display: flex;
        column-gap: 4px;
        color: rgb(8, 185, 78);
        font-size: 16px;
        line-height: 1.3;
        align-items: center;
    }
    & .callout-content {
        color: #222222;
        margin-top: 16px;
    }
}
</style>

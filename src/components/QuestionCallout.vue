<template>
    <div class="root">
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
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <!-- </div> -->
            <div class="callout-title-inner">问题</div>
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
    background-color: rgba(224, 172, 0, 0.1);
    & .callout-title {
        display: flex;
        column-gap: 4px;
        color: rgb(224, 172, 0);
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

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // plugins: [
    //     vue({
    //         template: {
    //             compilerOptions: {
    //                 isCustomElement: (tag) =>
    //                     ["QuestionCallout", "AnswerCallout"].includes(tag),
    //             },
    //         },
    //     }),
    // ],
});

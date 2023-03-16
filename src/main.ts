import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// import Popup from "./components/Popup.vue";
import NewPopup from "./components/NewPopup.vue";
// import QuestionCallout from "./components/QuestionCallout.vue";
// import AnswerCallout from "./components/AnswerCallout.vue";

const app = createApp(App);

// 全局注册 Popup 组件
// app.component("Popup", Popup);
app.component("NewPopup", NewPopup);
// app.component("QuestionCallout", QuestionCallout);
// app.component("AnswerCallout", AnswerCallout);

app.mount("#app");
// createApp(App).mount('#app')

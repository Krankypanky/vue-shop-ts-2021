import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./css/tailwind.css";
import config from "./config";

const app = createApp(App);

app.config.globalProperties.$config = config;

app.use(store).use(router).mount("#app");

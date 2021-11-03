import { createApp } from 'vue';
import Toast, { PluginOptions } from "vue-toastification";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import config from './config/index';
import './css/index.css';
import "vue-toastification/dist/index.css";

const toastOptions: PluginOptions = {
    // You can set your default options here
};

const appRoot = createApp(App);

appRoot.config.globalProperties.$config = config;
appRoot.config.globalProperties.$store = store;

appRoot.use(Toast, toastOptions);
appRoot.use(store);
appRoot.use(router);
appRoot.mount('#app');

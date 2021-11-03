import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import config from './config/index';
import './css/index.css';

const appRoot = createApp(App);

appRoot.config.globalProperties.$config = config;
appRoot.config.globalProperties.$store = store;

appRoot.use(store);
appRoot.use(router);
appRoot.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import api from '@/api';

import 'normalize.css/normalize.css';
import 'vant/lib/index.css';
import './styles/main.scss';
import 'virtual:svg-icons-register';

const app = createApp(App);

// 添加到全局属性
app.config.globalProperties.$api = api;

app.use(router);
app.use(pinia);

app.mount('#app');

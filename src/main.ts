import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';

import 'normalize.css/normalize.css';
import 'vant/lib/index.css';
import './styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');


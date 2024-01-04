import { createApp } from 'vue';
// import './style.css'
import App from './App.vue';

import pinia from './stores';

const app = createApp(App);
app.use(pinia);

app.mount('#app');

// aaa = 9
const hanyu: string = 'eee';

hanyu = 888;

console.log(hanyu);

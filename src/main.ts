import './assets/styles/global.scss';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './routes';

const pinia = createPinia();

// 解决 unocss reset 与 naive-ui 样式冲突
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

createApp(App).use(router).use(pinia).mount('#app');

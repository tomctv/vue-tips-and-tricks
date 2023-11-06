import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createPinia } from 'pinia';
import clickOutsideDirective from '@/directives/click-outside';
import { PiniaHistoryPlugin } from '@/plugins/PiniaHistoryPlugin';

const pinia = createPinia();
pinia.use(PiniaHistoryPlugin);

createApp(App)
  .use(pinia)
  .directive('click-outside', clickOutsideDirective)
  .mount('#app')

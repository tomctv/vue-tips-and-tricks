import { createApp } from 'vue'
import App from './App.vue'
import clickOutsideDirective from '@/directives/click-outside'

createApp(App)
  .directive('click-outside', clickOutsideDirective)
  .mount('#app')

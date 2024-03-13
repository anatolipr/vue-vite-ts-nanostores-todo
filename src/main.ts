import { createApp } from 'vue'
import { devtools } from '@nanostores/vue/devtools'
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.mount('#app');
app.use(devtools,{})
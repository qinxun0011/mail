import {createApp} from 'vue'
import App from './App.vue'
import mitt from "mitt"
import VueRouter from "@/router";

const app = createApp(App);
app.config.globalProperties.$bus = new mitt()
app.config.devtools = true
app.use(VueRouter).mount('#app')

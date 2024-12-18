import {createApp} from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "@/router";
import PrimeVue from 'primevue/config';
const app = createApp(App);

app
    .use(router)
    .use(PrimeVue)
    .mount("#app")

axios.defaults.baseURL = "http://localhost:8080";

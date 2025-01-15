import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import axios from "axios";
import VueAxios from "vue-axios";

const appInstance = createApp(App);

appInstance.use(VueAxios, axios); 
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);

appInstance.mount("#app"); 

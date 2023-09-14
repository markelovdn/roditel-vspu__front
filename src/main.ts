import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Dialog } from "quasar";
import axios from "axios"

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import "./assets/style/main.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

axios.defaults.baseURL = import.meta.env.BASE_URL

app.use(createPinia());
app.use(router);
app.use(Quasar, {
	plugins: {
		Dialog,
	}, // import Quasar plugins and add here
});

app.mount("#app");

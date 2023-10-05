import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Dialog } from "quasar";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./assets/style/main.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
  }, // import Quasar plugins and add here
});

app.mount("#app");

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./assets/style/main.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Dialog, Notify, Quasar } from "quasar";
import rus from "quasar/lang/ru";
import { createApp } from "vue";

import App from "./App.vue";
import useAppInit from "./hooks/useAppInit";
import router from "./router";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
useAppInit();

app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
  }, // import Quasar plugins and add here
  lang: rus,
});

app.mount("#app");

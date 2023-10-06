import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./assets/style/main.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Dialog, Notify, Quasar } from "quasar";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
useAuthStore().initRespInterceptors();
app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
  }, // import Quasar plugins and add here
});

app.mount("#app");

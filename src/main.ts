import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Dialog } from "quasar";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import "./assets/style/main.css";

import App from "./App.vue";
import router from "./router";
import { routerGuard } from "./router/routerGuard";

router.beforeEach(routerGuard);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
  }, // import Quasar plugins and add here
});

app.mount("#app");

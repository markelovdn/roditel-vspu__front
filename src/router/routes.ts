import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage/MainPage.vue"),
    meta: {
      background: "primary",
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/pages/AccountPage/AccountPage.vue"),
  },
  {
    path: "/ui",
    name: "Ui",
    component: () => import("@/pages/UiPage/UiPage.vue"),
  },
];

export default routes;

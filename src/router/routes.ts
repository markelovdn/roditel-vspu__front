import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage/MainPage.vue"),
    meta: {
      layout: "Main",
    },
    children: [
      {
        path: "/webinars",
        name: "Webinars",
        component: () => import("@/pages/WebinarsPage/WebinarsPage.vue"),
      },
      // {
      //   path: "/questions",
      //   name: "Questions",
      //   component: Questions,
      // },
      // {
      //   path: "/questionnaires",
      //   name: "Questionnaires",
      //   component: Questionnaires,
      // },
    ],
  },
  {
    path: "/ui",
    name: "Ui",
    component: () => import("@/pages/UiComponents.vue"),
    meta: {
      layout: "Home",
    },
  },
];

export default routes;

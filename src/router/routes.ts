// path: src/router/routes.ts

import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import WebinarsPage from "@/pages/WebinarsPage.vue";
import Questions from "@/pages/QuestionsPage.vue";
import Questionnaires from "@/pages/QuestionnairesPage.vue";
import UserData from "@/pages/UserDataPage.vue";
// import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      layout: "Home",
    },
  },
  {
    path: "/",
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/Webinars",
        name: "Webinars",
        component: WebinarsPage,
      },
      {
        path: "/Questions",
        name: "Questions",
        component: Questions,
      },
      {
        path: "/Questionnaires",
        name: "Questionnaires",
        component: Questionnaires,
      },
      {
        path: "/UserData",
        name: "UserData",
        component: UserData,
      },
    ],
  },
];

export default routes;

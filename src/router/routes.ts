import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage/MainPage.vue"),
    meta: {
      background: "primary",
      requireAuth: false,
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
  {
    path: "/resetPassword/:resetToken",
    name: "ResetPassword",
    meta: {
      requireAuth: false,
    },
    component: () => import("@/pages/ResetPasswordPage/ResetPasswordPage.vue"),
  },
];

export default routes;

import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage/MainPage.vue"),
    meta: {
      background: "primary",
      requireAuth: false,
      title: "Главная",
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/pages/AccountPage/AccountPage.vue"),
    meta: {
      title: "Личный кабинет",
    },
  },
  {
    path: "/consultants",
    name: "Consultants",
    component: () => import("@/pages/ConsultantsPage/ConsultantsPage.vue"),
    meta: {
      requireAuth: false,
      title: "Консультанты",
    },
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
      title: "Сбросить пароль",
    },
    component: () => import("@/pages/ResetPasswordPage/ResetPasswordPage.vue"),
  },
  {
    path: "/questionnaires",
    name: "Questionnaires",
    meta: {
      requireAuth: true,
      title: "Анкеты",
    },
    component: () => import("@/pages/QuestionnairesPage/QuestionnairesPage.vue"),
  },
  {
    path: "/questionnaire/:id",
    name: "ShowQuestionnaire",
    meta: {
      requireAuth: true,
      title: "Редактировать анкету",
    },
    component: () => import("@/pages/QuestionnairesPage/QuestionnairesPage.vue"),
  },
  {
    path: "/answerParentedQuesstionaire/:id",
    name: "AnswerQuestionnaire",
    meta: {
      requireAuth: true,
      title: "Ответить на анкету",
    },
    component: () => import("@/pages/ParentedAnswerQuesstionnairePage/ParentedAnswerQuesstionnairePage.vue"),
  },
  {
    path: "/createWebinar",
    name: "CreateWebinar",
    meta: {
      requireAuth: true,
      title: "Создать вебинар",
    },
    component: () => import("@/pages/WebinarPage/CreateWebinarPage.vue"),
  },
  {
    path: "/webinar/:id",
    name: "ShowWebinar",
    meta: {
      requireAuth: true,
      title: "Редактировать вебинар",
    },
    component: () => import("@/pages/WebinarPage/EditWebinarPage.vue"),
  },
];

export default routes;

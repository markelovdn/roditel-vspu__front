import { defineAsyncComponent } from "vue";

export const parentTabs = [
  {
    name: "webinars",
    label: "Вебинары",
    panelComponent: defineAsyncComponent(() => import("./WebinarsTab.vue")),
  },
  {
    name: "questions",
    label: "Вопросы",
    panelComponent: defineAsyncComponent(() => import("./QuestionsTab.vue")),
  },
  {
    name: "questionaries",
    label: "Анкеты",
    panelComponent: defineAsyncComponent(() => import("./QuestionariesTab.vue")),
  },
  {
    name: "personalData",
    label: "Персональные данные",
    panelComponent: defineAsyncComponent(() => import("./PersonalDataTab.vue")),
  },
];

import { defineAsyncComponent } from "vue";

export const consultantTabs = [
  {
    name: "journals",
    label: "Журналы",
    //TODO: можно в defineAsyncComponent определить компонент loader и error
    panelComponent: defineAsyncComponent(() => import("./JournalsTab.vue")),
  },
  {
    name: "applications",
    label: "Заявки",
    panelComponent: defineAsyncComponent(() => import("./ApplicationsTab.vue")),
  },
  {
    name: "questionnaires",
    label: "Анкеты",
    panelComponent: defineAsyncComponent(() => import("./QuestionnairesTab.vue")),
  },
  {
    name: "personalData",
    label: "Персональные данные",
    panelComponent: defineAsyncComponent(() => import("./PersonalDataTab.vue")),
  },
];

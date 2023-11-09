import { defineAsyncComponent } from "vue";

export type TPersonalDataPayload = {
  name?: string;
  email?: string;
  phone?: string;
  specializationId?: number | null;
  professionId?: number | null;
  description: string;
  image?: File | FileList | null;
};

export const consultantTabs = [
  {
    name: "reports",
    label: "Журналы",
    //TODO: можно в defineAsyncComponent определить компонент loader и error
    panelComponent: defineAsyncComponent(() => import("./ReportsTab.vue")),
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

export type TDateFilter = {
  from: string;
  to: string;
};

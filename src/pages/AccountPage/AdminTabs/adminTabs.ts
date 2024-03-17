import { defineAsyncComponent } from "vue";

export const adminTabs = [
  {
    name: "consultants",
    label: "Консультанты",
    panelComponent: defineAsyncComponent(() => import("./ConsultantsTab.vue")),
  },
  {
    name: "parents",
    label: "Родители",
    panelComponent: defineAsyncComponent(() => import("./ParentsTab.vue")),
  },
  {
    name: "webinars",
    label: "Вебинары",
    panelComponent: defineAsyncComponent(() => import("./WebinarsTab.vue")),
  },
  {
    name: "reports",
    label: "Журналы",
    //TODO: можно в defineAsyncComponent определить компонент loader и error
    panelComponent: defineAsyncComponent(() => import("./ReportsTab.vue")),
  },
];

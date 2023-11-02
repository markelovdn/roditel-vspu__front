import { defineAsyncComponent } from "vue";

import type { TQuestionType } from "@/pages/QuestionnairesPage/types";

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

export type TQuestionnairesData = {
  data: Array<TQuestionnaireData>;
};

export type TQuestionnaireData = {
  id: number;
  title: string;
  description: string;
  answerBefore?: string;
  questions: Array<TQuestionData>;
};

export type TQuestionData = {
  id: number;
  text: string;
  description?: string;
  type: TQuestionType;
  options: Array<TOptionData>;
  other: TOtherOptionData;
};

export type TOptionData = { id?: number; text: string };
export type TOtherOptionData = { id?: number; show: boolean; text: string };

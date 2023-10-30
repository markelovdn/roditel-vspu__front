import { defineStore } from "pinia";

import { questionnairesApi } from "@/api";
import { TQuestionnairePayload } from "@/pages/QuestionnairesPage/types";

export const useQuestionnairesStore = defineStore("questionnaresStore", () => {
  function requestNewQuestionnaire(consultantId: number, questionnaire: TQuestionnairePayload) {
    questionnairesApi.addQuestionnaire(consultantId, questionnaire).then((resp) => {
      console.log(resp);
    });
  }
  return {
    requestNewQuestionnaire,
  };
});

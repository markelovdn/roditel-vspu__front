import { defineStore } from "pinia";
import { ref } from "vue";

import { questionnairesApi } from "@/api";
import { TGetConsultantQuestionnairesFilter } from "@/api/Questionnaires/types";
import { TQuestionnairePayload } from "@/pages/QuestionnairesPage/types";

import { useAuthStore } from "./authStore";

const questionnaires = ref<TQuestionnairePayload[]>([]);

export const useQuestionnairesStore = defineStore("questionnaresStore", () => {
  const authStore = useAuthStore();
  const consultantId = authStore.getUserId;

  function requestNewQuestionnaire(consultantId: number, questionnaire: TQuestionnairePayload) {
    questionnairesApi.addQuestionnaire(consultantId, questionnaire).then((resp) => {
      console.log(resp);
    });
  }

  function getQuestionnaires(filters: TGetConsultantQuestionnairesFilter) {
    if (consultantId === undefined) return;
    questionnairesApi.getQuestionnaires(consultantId, filters).then((resp) => (questionnaires.value = resp.data));
  }

  return {
    questionnaires,
    getQuestionnaires,
    requestNewQuestionnaire,
  };
});

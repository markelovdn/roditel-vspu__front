import { defineStore } from "pinia";
import { ref } from "vue";

import { questionnairesApi } from "@/api";
import { toTQuestionnairesData } from "@/api/Questionnaires/mappers";
import { TGetConsultantQuestionnairesFilter, TQuestionnairePayload } from "@/api/Questionnaires/types";

import { useAuthStore } from "./authStore";
const questionnaires = ref<TQuestionnairePayload[]>([]);
const questionnaire = ref<TQuestionnairePayload>({
  id: null,
  title: "",
  description: "",
  answerBefore: "",
  updatedAt: "",
  questions: [],
});

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
    questionnairesApi.getQuestionnaires(consultantId, filters).then((resp) => {
      questionnaires.value = toTQuestionnairesData(resp.data);
    });
  }

  async function editQuestionnaire(questionnaireId: number) {
    await questionnairesApi.showQuestionnaire(questionnaireId).then((resp) => {
      console.log(resp.data.data[0]);
      questionnaire.value = resp.data.data[0];
    });
  }

  return {
    questionnaires,
    questionnaire,
    getQuestionnaires,
    requestNewQuestionnaire,
    editQuestionnaire,
  };
});

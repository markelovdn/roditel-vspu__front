import { defineStore } from "pinia";
import { ref } from "vue";

import { questionnairesApi } from "@/api";
import { toTQuestionnairesData } from "@/api/Questionnaires/mappers";
import { TGetConsultantQuestionnairesFilter, TQuestionnairePayload } from "@/api/Questionnaires/types";
import notify from "@/utils/notify";

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

  function getQuestionnaires(filters: TGetConsultantQuestionnairesFilter) {
    if (consultantId === undefined) return;
    questionnairesApi.getQuestionnaires(consultantId, filters).then((resp) => {
      questionnaires.value = toTQuestionnairesData(resp.data);
    });
  }

  function addQuestionnaire(consultantId: number, questionnaire: TQuestionnairePayload) {
    questionnairesApi.addQuestionnaire(consultantId, questionnaire).then((resp) => {
      console.log(resp);
      notify({ type: "positive", message: "Новая анкета успешно добавлена" });
    });
  }

  async function showQuestionnaire(questionnaireId: number) {
    await questionnairesApi.showQuestionnaire(questionnaireId).then((resp) => {
      questionnaire.value = resp.data.data[0];
    });
  }

  async function updateQuestionnaire(questionnaireId: number, questionnaire: TQuestionnairePayload) {
    await questionnairesApi.updateQuestionnaire(questionnaireId, questionnaire).then((resp) => {
      console.log(resp);
      notify({ type: "positive", message: "Анкета успешно обновлена" });
    });
  }

  async function deleteQuestionnaire(questionnaireId: number) {
    await questionnairesApi.deleteQuestionnaire(questionnaireId).then((resp) => {
      console.log(resp);
      notify({ type: "positive", message: "Анкета успешно удалена" });
    });
  }

  return {
    questionnaires,
    questionnaire,
    getQuestionnaires,
    addQuestionnaire,
    showQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
  };
});

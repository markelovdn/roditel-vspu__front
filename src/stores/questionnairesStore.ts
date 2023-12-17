import { defineStore } from "pinia";
import { ref } from "vue";

import { questionnairesApi } from "@/api";
import {
  TGetConsultantQuestionnairesFilter,
  TOtherAnsweres as TOtherAnswers,
  TQuestionnairePayload,
  TSelectedAnswers as TSelectedAnswers,
} from "@/api/Questionnaires/types";
import notify from "@/utils/notify";

import { useAuthStore } from "./authStore";

export const useQuestionnairesStore = defineStore("questionnaresStore", () => {
  const authStore = useAuthStore();
  const consultantId = authStore.getUserId;
  const questionnaires = ref<TQuestionnairePayload[]>([]);
  const questionnaire = ref<TQuestionnairePayload>({
    id: null,
    title: "",
    description: "",
    answerBefore: "",
    updatedAt: "",
    questions: [],
  });
  const page = ref({
    current: 1,
    max: 1,
  });

  const temp: any = ref([]);

  function clearFilters() {
    page.value.current = 1;
    page.value.max = 1;
  }

  function getQuestionnaires(filters: TGetConsultantQuestionnairesFilter) {
    if (consultantId === undefined) return;
    questionnairesApi.getQuestionnaires(consultantId, filters).then((resp) => {
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      questionnaires.value = resp.data.data;
    });
  }

  function addQuestionnaire(consultantId: number, questionnaire: TQuestionnairePayload) {
    questionnairesApi.addQuestionnaire(consultantId, questionnaire).then(() => {
      notify({ type: "positive", message: "Новая анкета успешно добавлена" });
    });
  }

  async function showQuestionnaire(questionnaireId: number) {
    await questionnairesApi.showQuestionnaire(questionnaireId).then((resp) => {
      questionnaire.value = resp.data.data[0];
    });
  }

  async function updateQuestionnaire(questionnaireId: number, questionnaire: TQuestionnairePayload) {
    await questionnairesApi.updateQuestionnaire(questionnaireId, questionnaire).then(() => {
      notify({ type: "positive", message: "Анкета успешно обновлена" });
    });
  }

  async function deleteQuestionnaire(questionnaireId: number) {
    await questionnairesApi.deleteQuestionnaire(questionnaireId).then((resp) => {
      console.log(resp);
      notify({ type: "positive", message: "Анкета успешно удалена" });
    });
  }

  async function setSelectedParentedAnswers(
    questionnaireId: number | string,
    selected: TSelectedAnswers,
    other: TOtherAnswers,
  ) {
    await questionnairesApi.setSelectedParentedAnswers(questionnaireId, selected, other).then(() => {
      notify({ type: "positive", message: "Ответы на анкету добавлены" });
    });
  }

  async function getSelectedParentedAnswers(questionnaireId: number | string) {
    await questionnairesApi.getSelectedParentedAnswers(questionnaireId).then((resp) => {
      temp.value = resp.data;
      notify({ type: "positive", message: "Ответы загружены" });
    });
  }

  async function setQuestionnaireToParented(questionnaireId: number | string | null | undefined) {
    await questionnairesApi.setQuestionnaireToParented(questionnaireId).then(() => {
      notify({ type: "positive", message: "Родитель назначен для анкеты" });
    });
  }

  return {
    questionnaires,
    questionnaire,
    page,
    temp,
    getQuestionnaires,
    addQuestionnaire,
    showQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
    clearFilters,
    setSelectedParentedAnswers,
    setQuestionnaireToParented,
    getSelectedParentedAnswers,
  };
});

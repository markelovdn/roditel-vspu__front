import axios from "@/common/axios";

import { TGetConsultantQuestionnairesFilter, TQuestionnairePayload, TQuestionnairesData } from "./types";

export class QuestionnairesApiService {
  //TODO: указать типы response
  getQuestionnaires(consultantId: number | string, filters: TGetConsultantQuestionnairesFilter) {
    let query = {};
    if (filters.page !== undefined) {
      query = new URLSearchParams({ ...filters, page: filters.page.toString() } || {});
    }
    //TODO: написать функцию принимающуу url и параметры query, на выходе целая строка собранная
    // учесть то, что URLSearchParams хочет на вход параметры в виде строки, нужен для этого конвертер
    return axios.get<TQuestionnairesData>(`/consultant/${consultantId}/questionnaires${query ? "?" + query : ""}`);
  }

  //TODO: указать типы response
  addQuestionnaire(consultantId: number | string, questionnaire: TQuestionnairePayload) {
    return axios.post<TQuestionnairePayload>(`/consultant/${consultantId}/questionnaires`, {
      title: questionnaire.title,
      description: questionnaire.description,
      //TODO: поправить метод для даты
      answerBefore: "10.08.2000",
      questions: questionnaire.questions,
    });
  }

  //TODO: указать типы response
  showQuestionnaire(questionaireId: number | string) {
    return axios.get<TQuestionnairePayload>(`/questionnaires/${questionaireId}`);
  }

  //TODO: указать типы response
  updateQuestionnaire(questionaireId: number | string) {
    return axios.post<TQuestionnairePayload>(`/questionnaires/${questionaireId}`);
  }
}

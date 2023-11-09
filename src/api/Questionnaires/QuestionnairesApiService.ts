import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TGetConsultantQuestionnairesFilter, TQuestionnairePayload, TQuestionnairesData } from "./types";

export class QuestionnairesApiService {
  getQuestionnaires(consultantId: number | string, filters: TGetConsultantQuestionnairesFilter) {
    return axios.get<TQuestionnairesData>(
      useUrlParams(`/consultant/${consultantId}/questionnaires`, useParamBuilder(filters)),
    );
  }

  addQuestionnaire(consultantId: number | string, questionnaire: TQuestionnairePayload) {
    return axios.post<TQuestionnairePayload>(`/consultant/${consultantId}/questionnaires`, {
      title: questionnaire.title,
      description: questionnaire.description,
      //TODO: поправить метод для даты
      answerBefore: "10.08.2000",
      questions: questionnaire.questions,
    });
  }

  showQuestionnaire(questionaireId: number | string) {
    return axios.get<TQuestionnairesData>(`/questionnaires/${questionaireId}`);
  }

  updateQuestionnaire(questionaireId: number | string, questionnaire: TQuestionnairePayload) {
    return axios.put<TQuestionnairePayload>(`/questionnaires/${questionaireId}`, {
      id: questionnaire.id,
      title: questionnaire.title,
      description: questionnaire.description,
      //TODO: поправить метод для даты
      answerBefore: "10.08.2000",
      questions: questionnaire.questions,
    });
  }

  deleteQuestionnaire(questionaireId: number | string) {
    return axios.delete(`/questionnaires/${questionaireId}`);
  }
}

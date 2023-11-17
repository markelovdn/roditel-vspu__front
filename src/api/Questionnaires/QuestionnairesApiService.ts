import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import {
  TGetConsultantQuestionnairesFilter,
  TOtherAnsweres,
  TQuestionnairePayload,
  TQuestionnairesData,
  TSelectedAnsweres,
} from "./types";

export class QuestionnairesApiService {
  getQuestionnaires(consultantId: number | string, filters: TGetConsultantQuestionnairesFilter) {
    return axios.get<TQuestionnairesData>(
      useUrlParams(`/consultant/${consultantId}/questionnaires`, useParamBuilder(filters)),
    );
  }

  addQuestionnaire(consultantId: number | string, questionnaire: TQuestionnairePayload) {
    return axios.post<TQuestionnairePayload>(`/consultant/${consultantId}/questionnaires?XDEBUG_SESSION=VSCODE`, {
      title: questionnaire.title,
      description: questionnaire.description,
      answerBefore: questionnaire.answerBefore,
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
      answerBefore: questionnaire.answerBefore,
      questions: questionnaire.questions,
    });
  }

  deleteQuestionnaire(questionaireId: number | string) {
    return axios.delete(`/questionnaires/${questionaireId}`);
  }

  //TODO:: временнный метод
  setQuestionnaireToParented(questionnaireId: number | string | null | undefined) {
    return axios.post(`/setParentedToQuestionnaire?XDEBUG_SESSION=VSCODE`, {
      questionnaireId: questionnaireId,
      parentedId: 21,
    });
  }

  setSelectedParentedAnsweres(questionaireId: number | string, selected: TSelectedAnsweres, other: TOtherAnsweres) {
    return axios.post(`/questionnaire/${questionaireId}/selectedOptions`, {
      selected: selected,
      other: other,
    });
  }

  getSelectedParentedAnsweres(questionaireId: number | string) {
    return axios.get(`/questionnaire/${questionaireId}/selectedOptions`);
  }
}

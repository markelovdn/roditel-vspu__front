import { TQuestionnairePayload, TQuestionnairesData } from "@/api/Questionnaires/types";

export const toTQuestionnairesData = (questionnairesData: TQuestionnairesData): TQuestionnairePayload[] => {
  return questionnairesData.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      answerBefore: item.answerBefore,
      questions: item.questions,
    };
  });
};

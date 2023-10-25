import { type questionType } from "@/pages/QuestionnairesPage/types";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: {
    id?: number | null;
    text: string;
    description?: string;
    type: questionType;
    options: {
      id?: number | null;
      text: string;
    }[];
  }[];
};

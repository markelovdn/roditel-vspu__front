export type questionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: Array<{
    id?: number | null;
    text: string;
    description?: string;
    type: string;
    options: Array<{ id?: number | null; text?: string; textFree?: string }>;
  }>;
};

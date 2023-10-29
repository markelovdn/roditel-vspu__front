export type TQuestionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: Array<{
    id?: number | null;
    text: string;
    description?: string;
    type: string;
    options: Array<{ id?: number | null; text: string }>;
  }>;
};

export type TDefaultQuestion = { text: string; description: string; type: TQuestionType; options: TDefaultOption[] };
export type TDefaultOption = { text: string };

export type questionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: {
    id?: number | null;
    text: string;
    description?: string;
    type: string;
    options: { id?: number | null; text: string }[];
  }[];
};

export type TQuestion = {
  id?: number | null;
  text: string;
  description?: string;
  type: string;
  options: TOptions[];
};

export type TOptions = {
  id?: number | null;
  text: string;
};

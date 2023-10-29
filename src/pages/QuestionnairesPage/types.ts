export type TQuestionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: Array<TDefaultQuestion>;
};

export type TDefaultQuestion = {
  id?: number;
  text: string;
  description?: string;
  type: TQuestionType;
  options: Array<TDefaultOption>;
  other: TOtherOption;
};

export type TDefaultOption = { id?: number; text: string };
export type TOtherOption = { id?: number; show: boolean; text: string };

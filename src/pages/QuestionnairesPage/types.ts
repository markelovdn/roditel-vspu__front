export type questionType = "text" | "single" | "many";

export type TDefaultQuestion = { text: string; description: string; type: string; options: TDefaultOption[] };
export type TDefaultOption = { text: string };

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: Array<TDefaultQuestion>;
};

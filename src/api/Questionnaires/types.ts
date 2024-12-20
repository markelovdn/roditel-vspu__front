export type TGetConsultantQuestionnairesFilter = {
  page?: string | number;
  dateBetween?: string;
  status?: string;
};

export type TQuestionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  id?: number | null;
  title: string;
  description?: string;
  answerBefore?: string;
  fileUrl?: string;
  fileName?: string;
  status?: string;
  parented?: string;
  consultant?: string;
  updatedAt?: string;
  questions: Array<TDefaultQuestion>;
};

export type TDefaultQuestion = {
  id?: number | null;
  text: string;
  description?: string;
  type: TQuestionType;
  options: Array<TDefaultOption>;
  other: TOtherOption;
};

export type TDefaultOption = { id?: number | null; text: string };
export type TOtherOption = { id?: number | null; show: boolean; text: string };

export type TQuestionnairesData = {
  data: Array<TQuestionnairePayload>;
  links: any;
  meta: any;
};

export type TSelectedAnswers = Array<{
  questionId: number;
  optionId: number;
}>;

export type TOtherAnsweres = Array<{
  questionId: number;
  text: string;
}>;

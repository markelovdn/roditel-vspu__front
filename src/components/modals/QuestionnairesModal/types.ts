export type questionType = "text | single | many";

export type TQuestionnaire = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: {
    id?: number | null;
    text: string;
    description?: string;
    type: questionType;
    options: { id?: number | null; text: string }[];
  }[];
};

export type TQuestion = {
  id?: number | null;
  text: string;
  description?: string;
  type: questionType;
  options: TOptions[];
};

export type TOptions = {
  id?: number | null;
  text: string;
};

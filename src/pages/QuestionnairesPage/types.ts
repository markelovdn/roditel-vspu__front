export type questionType = "text" | "single" | "many";

export type TQuestionnairePayload = {
  title: string;
  description: string;
  answerBefore?: string;
  questions: {
    [
      id: number,
      text: string,
      description?: string,
      type: string,
      options: {
        [id: number, text: string];
      },
    ];
  };
};

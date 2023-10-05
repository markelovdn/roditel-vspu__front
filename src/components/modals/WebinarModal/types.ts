export type TWebinarResponse = {
  id: number | null;
  title: string | undefined;
  questions: {
    id: number | null;
    questionText: string | undefined;
  }[];
};

//Переделать получение с бэка question_text

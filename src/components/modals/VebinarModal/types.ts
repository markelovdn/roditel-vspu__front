export type TVebinarGetData = {
  title: string;
  questions: {
    id?: number,
    question_text: string,
    vebinar_id?: number,
    created_at?: string,
    updated_at?: string
  };
};

//Переделать получение с бэка question_text
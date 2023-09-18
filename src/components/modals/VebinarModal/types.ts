export type TVebinarGetData = {
  title: string | undefined;
  questions: {
    id?: number | undefined,
    question_text: string | undefined,
    vebinar_id?: number | undefined,
    created_at?: string | undefined,
    updated_at?: string | undefined
  };
};

//Переделать получение с бэка question_text
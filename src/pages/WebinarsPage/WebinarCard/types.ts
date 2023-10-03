export type TWebinarCardData = {
  imageUrl: string;
  title: string;
  category: string; //* Добавить категории
  lecturer?: string;
  cost: "Бесплатно" | number | string;
  date: string; //* Временно, пока непонятно в каком формате это будет
};

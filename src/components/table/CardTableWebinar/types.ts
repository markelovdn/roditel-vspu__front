export interface Webinar {
  imageUrl: string;
  title: string;
  category: string; //* Добавить категории
  lecturer?: string;
  cost: "Бесплатно" | number;
  date: string; //* Временно, пока непонятно в каком формате это будет
}

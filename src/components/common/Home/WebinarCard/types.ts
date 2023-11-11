import { TWebinarQuestion, TWebinarsLectors } from "@/api/Webinars/types";

export type TWebinarCardData = {
  id: number;
  imageUrl: string;
  title: string;
  category: string; //* Добавить категории
  lectors: TWebinarsLectors;
  cost: "Бесплатно" | number | string;
  date: string; //* Временно, пока непонятно в каком формате это будет
  questions: TWebinarQuestion[];
};

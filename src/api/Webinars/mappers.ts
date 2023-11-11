import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";

import { TWebinarData } from "./types";

export const toTWebinarCardData = (webinarData: TWebinarData): TWebinarCardData[] => {
  return webinarData.data.map((item) => {
    return {
      id: item.id,
      imageUrl: item.logo,
      title: item.title,
      category: item.webinarCategory.title,
      lectors: item.lectors,
      cost: item.cost,
      date: item.date + ` с ${item.timeStart} до ${item.timeEnd}`,
      questions: item.questions,
    };
  });
};

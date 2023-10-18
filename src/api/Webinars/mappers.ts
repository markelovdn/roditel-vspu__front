import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";

import { TWebinarData } from "./types";

export const toTWebinarCardData = (webinarData: TWebinarData): TWebinarCardData[] => {
  return webinarData.data.map((item) => {
    return {
      imageUrl: item.logo,
      title: item.title,
      category: item.webinarCategory.title,
      lector: item.lectors.reduce((acm, item, index) => (acm += index ? ", " + item.lectorName : item.lectorName), ""),
      cost: item.cost,
      date: item.date + ` с ${item.timeStart} до ${item.timeEnd}`,
    };
  });
};

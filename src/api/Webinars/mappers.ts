import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";

import { TWebinarsData } from "./types";

export const toTWebinarCardData = (webinarData: TWebinarsData): TWebinarCardData[] => {
  return webinarData.data.map((item) => {
    return {
      id: item.id,
      imageUrl: item.logo,
      title: item.title,
      category: item.webinarCategory.title,
      lectors: item.lectors,
      cost: item.cost,
      prefixSertificate: item.prefixSertificate,
      numberSertificate: item.numberSertificate,
      date: item.date + ` с ${item.timeStart} до ${item.timeEnd}`,
      registered: item.registered,
      videoLink: item.videoLink,
      questions: item.questions,
    };
  });
};

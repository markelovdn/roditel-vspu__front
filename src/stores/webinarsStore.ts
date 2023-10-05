import { TWebinarCardData } from "@/pages/WebinarsPage/WebinarCard/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWebinarsStore = defineStore("webinarsStore", () => {
  // Вебинары по дефолту загружается 1 страница. Существуют методы пагинации изменяющие
  // https://markelovdn.ru/api/documentation#/WEBINARS/getWebinarsList
  const mocks: TWebinarCardData[] = [
    {
      imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
      title:
        "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
      category: "Основная школа",
      lecturer: "Ястребова Гульнара Ахмедовна",
      cost: "Бесплатно",
      date: "19.11.21 c 14:00 до 15:00 (Мск)",
    },
    {
      imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
      title:
        "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
      category: "Основная школа",
      lecturer: "Ястребова Гульнара Ахмедовна",
      cost: "Бесплатно",
      date: "19.11.21 c 14:00 до 15:00 (Мск)",
    },
    {
      imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
      title:
        "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
      category: "Основная школа",
      lecturer: "Ястребова Гульнара Ахмедовна",
      cost: "Бесплатно",
      date: "19.11.21 c 14:00 до 15:00 (Мск)",
    },
    {
      imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
      title:
        "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
      category: "Основная школа",
      lecturer: "Ястребова Гульнара Ахмедовна",
      cost: "Бесплатно",
      date: "19.11.21 c 14:00 до 15:00 (Мск)",
    },
    {
      imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
      title:
        "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
      category: "Основная школа",
      lecturer: "Ястребова Гульнара Ахмедовна",
      cost: "Бесплатно",
      date: "19.11.21 c 14:00 до 15:00 (Мск)",
    },
  ];

  const webinars = ref<TWebinarCardData[]>(mocks);

  return { webinars };
});

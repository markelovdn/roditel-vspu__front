import { defineStore } from "pinia";
import { ref } from "vue";

import { webinarsApi } from "@/api";
import { toTWebinarCardData } from "@/api/Webinars/mappers";
import { TWebinarsLectors, TWebinarsRequestOption } from "@/api/Webinars/types";
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";

export const useWebinarsStore = defineStore("webinarsStore", () => {
  // Вебинары по дефолту загружается 1 страница. Существуют методы пагинации изменяющие
  // https://markelovdn.ru/api/documentation#/WEBINARS/getWebinarsList

  const webinars = ref<TWebinarCardData[]>();
  const lectors = ref<TWebinarsLectors>([]);
  const page = ref({
    current: 1,
    max: 1,
  });

  function requestLectors() {
    webinarsApi.getLectors().then((resp) => (lectors.value = resp.data));
  }
  function requestWebinars(options: TWebinarsRequestOption) {
    webinarsApi.getWebinars(options).then((resp) => {
      page.value.max = resp.data.links.last.split("?page=")[1];
      webinars.value = toTWebinarCardData(resp.data);
    });
  }
  return { webinars, page, requestLectors, requestWebinars };
});

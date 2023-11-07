import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { webinarsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";
import { toTWebinarCardData } from "@/api/Webinars/mappers";
import { TWebinarsLectors, TWebinarsRequestOption } from "@/api/Webinars/types";
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";

export const useWebinarsStore = defineStore("webinarsStore", () => {
  // Вебинары по дефолту загружается 1 страница. Существуют методы пагинации изменяющие
  // https://markelovdn.ru/api/documentation#/WEBINARS/getWebinarsList
  const webinarCategories = ref<TCollectionItem[]>([]);
  const webinars = ref<TWebinarCardData[]>([]);
  const lectors = ref<TWebinarsLectors>([]);
  const page = ref({
    current: 1,
    max: 1,
  });

  function requestLectors() {
    webinarsApi.getLectors().then((resp) => (lectors.value = resp.data));
  }
  function requestWebinarCategories() {
    webinarsApi.getCategories().then((resp) => (webinarCategories.value = resp.data.data));
  }
  function requestWebinars(options: TWebinarsRequestOption) {
    webinarsApi.getWebinars(options).then((resp) => {
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      webinars.value = toTWebinarCardData(resp.data);
    });
  }
  const getWebinarCategories = computed(() => {
    return webinarCategories.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  const getWebinarCategoriesWithAll = computed(() => {
    return [{ label: "Все", value: 0 }, ...getWebinarCategories.value];
  });
  const getWebinarLectors = computed(() => {
    return lectors.value.map((item: string) => {
      return { label: item, value: item };
    });
  });
  const getWebinarLectorsWithAll = computed(() => {
    return [{ label: "Все", value: 0 }, ...getWebinarLectors.value];
  });
  return {
    webinars,
    page,
    requestLectors,
    requestWebinars,
    requestWebinarCategories,
    getWebinarCategories,
    getWebinarCategoriesWithAll,
    getWebinarLectors,
    getWebinarLectorsWithAll,
  };
});

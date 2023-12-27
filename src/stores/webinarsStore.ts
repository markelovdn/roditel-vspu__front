import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { webinarsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";
import { toTWebinarCardData } from "@/api/Webinars/mappers";
import { TWebinarsLector, TWebinarsLectors, TWebinarsRequestOption } from "@/api/Webinars/types";
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";
import notify from "@/utils/notify";

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
  async function getWebinarQuestions(id: number): Promise<{ id: string; title: string }[]> {
    const resp = await webinarsApi.getWebinarQuestions(id);
    return resp.data.data;
  }
  function requestLectors() {
    webinarsApi.getLectors().then((resp) => (lectors.value = resp.data.data));
  }
  function requestWebinarCategories() {
    webinarsApi.getCategories().then((resp) => (webinarCategories.value = resp.data.data));
  }
  function registrationPartisipant(webinarId: number, userId: number) {
    webinarsApi
      .registrationPartisipant(webinarId, userId)
      .then(() => {
        notify({
          type: "positive",
          message: "Вы успешно зарегистрированы на вебинар",
        });
        webinars.value[webinars.value.findIndex((w) => w.id === webinarId)].registered = true;
      })
      .catch((err) => {
        if (err.response.status !== 401) {
          notify({ type: "negative", message: "Произошла ошибка!" });
        }
      });
  }
  function downloadSertificate(webinarId: number, userId: number) {
    return webinarsApi.downloadSertificate(webinarId, userId).then((resp) => {
      return resp;
    });
  }
  function requestWebinars(options: TWebinarsRequestOption) {
    webinarsApi.getWebinars(options).then((resp) => {
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      webinars.value = toTWebinarCardData(resp.data);
    });
  }

  async function requestLectorInfo(lectorId: number) {
    const resp = await webinarsApi.getLectorInfo(lectorId);
    return resp.data;
  }

  function addLector(lector: TWebinarsLector) {
    return webinarsApi.addLector(lector);
  }

  function updateLector(lectorId: number, lector: TWebinarsLector) {
    return webinarsApi.updateLector(lectorId, lector);
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
    return lectors.value.map((item) => {
      return { label: item.lectorName, value: item.id };
    });
  });
  const getWebinarLectorsWithAll = computed(() => {
    return [{ label: "Все", value: 0 }, ...getWebinarLectors.value];
  });

  return {
    webinars,
    page,
    lectors,
    updateLector,
    requestLectors,
    requestWebinars,
    requestWebinarCategories,
    getWebinarQuestions,
    registrationPartisipant,
    getWebinarCategories,
    getWebinarCategoriesWithAll,
    getWebinarLectors,
    getWebinarLectorsWithAll,
    downloadSertificate,
    requestLectorInfo,
    addLector,
  };
});

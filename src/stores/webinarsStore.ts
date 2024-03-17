import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { webinarsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";
import { toTWebinarCardData } from "@/api/Webinars/mappers";
import {
  TWebinarData,
  TWebinarPayload,
  TWebinarsLector,
  TWebinarsLectors,
  TWebinarsRequestOption,
} from "@/api/Webinars/types";
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";
import notify from "@/utils/notify";

export const useWebinarsStore = defineStore("webinarsStore", () => {
  const webinarCategories = ref<TCollectionItem[]>([]);
  const webinars = ref<TWebinarCardData[]>([]);
  const webinar = ref<TWebinarData>();
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
    return webinarsApi.downloadSertificate(webinarId, userId);
  }

  function dowloadWebinarPartisipants(webinarId: number) {
    return webinarsApi.downloadParticipantList(webinarId);
  }

  async function requestWebinars(options: TWebinarsRequestOption) {
    await webinarsApi.getWebinars(options).then((resp) => {
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
    return webinarsApi
      .addLector(lector)
      .then(() =>
        notify({
          type: "positive",
          message: "Лектор успешно добавлен",
        }),
      )
      .catch(() => notify({ type: "negative", message: "Поле ФИО обязательно для заполнения" }));
  }

  function updateLector(lectorId: number, lector: TWebinarsLector) {
    return webinarsApi
      .updateLector(lectorId, lector)
      .then(() =>
        notify({
          type: "positive",
          message: "Данные успешно обновлены",
        }),
      )
      .catch(() => notify({ type: "negative", message: "Поле ФИО обязательно для заполнения" }));
  }

  async function addWebinar(webinar: TWebinarPayload) {
    await webinarsApi.addWebinar(webinar).then(() => {
      const options = {} as TWebinarsRequestOption;
      webinarsApi.getWebinars(options).then((resp) => {
        page.value.max = resp.data.meta.last_page;
        page.value.current = resp.data.meta.current_page;
        webinars.value = toTWebinarCardData(resp.data);
      });
    });
  }

  async function showWebinar(webinarId: number) {
    await webinarsApi.showWebinar(webinarId).then((resp) => (webinar.value = resp.data));
  }

  function updateWebinar(webinarId: number, webinar: TWebinarPayload) {
    return webinarsApi.updateWebinar(webinarId, webinar);
  }

  async function deleteWebinar(webinarId: number) {
    await webinarsApi
      .deleteWebinar(webinarId)
      .then(() => {
        // webinars.value = webinars.value.filter((w) => w.id !== webinarId);
        const options = {} as TWebinarsRequestOption;
        webinarsApi.getWebinars(options).then((resp) => {
          page.value.max = resp.data.meta.last_page;
          page.value.current = resp.data.meta.current_page;
          webinars.value = toTWebinarCardData(resp.data);
        });
        notify({ type: "positive", message: "Вебинар успешно удален" });
      })
      .catch((err) => {
        if (err.response.status !== 401) {
          notify({ type: "negative", message: "Не удалось удалить вебинар" });
        }
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
    return lectors.value.map((item) => {
      return { label: item.lectorName, value: item.id };
    });
  });

  const getWebinarLectorsWithAll = computed(() => {
    return [{ label: "Все", value: 0 }, ...getWebinarLectors.value];
  });

  return {
    webinars,
    webinar,
    page,
    lectors,
    addWebinar,
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
    dowloadWebinarPartisipants,
    requestLectorInfo,
    addLector,
    showWebinar,
    updateWebinar,
    deleteWebinar,
  };
});

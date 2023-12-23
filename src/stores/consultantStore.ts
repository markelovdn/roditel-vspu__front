import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { collectionsApi, consultantApi } from "@/api";
import { toConsultantReportsData } from "@/api/Consultant/mappers";
import {
  TAllConsultants,
  TGetConsultantInfo,
  TGetConsultantReportsData,
  TGetConsultantReportsFilter,
} from "@/api/Consultant/types";
import { TWebinarsRequestOption } from "@/api/Webinars/types";
import { Consultant } from "@/components/common/Home/ConsultantsCard/types";
import { TConsultantParentsPayload } from "@/components/modals/ConsultantChoiceParentsModal/types";
import { TConsultantFeedbackPayload } from "@/components/modals/ConsultantFeedback/types";
import { TPersonalDataPayload } from "@/pages/AccountPage/ConsultantTabs/types";
import notify from "@/utils/notify";

import { useAuthStore } from "./authStore";

export const useConsultantStore = defineStore("consultantStore", () => {
  const reportsModel = ref<TGetConsultantReportsData>();
  const consultantInfo = ref<TGetConsultantInfo>();
  const authStore = useAuthStore();
  const consultantId = authStore.getUserId;
  // const consultants = ref<TGetAllConsultants[]>([]);
  const consultants = ref<Consultant[]>([]);
  const consultantsAll = ref<TAllConsultants>([]);
  const allParents = ref<TConsultantParentsPayload[]>([]);

  const page = ref({
    current: 1,
    max: 1,
  });

  const getParentsList = computed(() => {
    return allParents.value.map((item) => {
      return item;
    });
  });

  function requestReports(filters: TGetConsultantReportsFilter) {
    if (consultantId === undefined) return;
    consultantApi
      .getReports(consultantId, filters)
      .then((resp) => (reportsModel.value = toConsultantReportsData(resp.data)));
  }
  function getReports(filters: TGetConsultantReportsFilter) {
    if (consultantId === undefined) return;
    return consultantApi.getReports(consultantId, filters).then((resp) => toConsultantReportsData(resp.data));
  }
  async function createReport(payload: FormData) {
    if (consultantId === undefined) return;
    try {
      return consultantApi.createReport(consultantId, payload).then((resp) => resp.status);
    } catch (err) {
      console.log(err);
    }
  }

  async function getConsultantInfo() {
    if (consultantId === undefined) return;
    consultantApi.getConsultantInfo(consultantId).then((resp) => (consultantInfo.value = resp.data.data[0]));
  }

  async function requestConsultants(options: TWebinarsRequestOption) {
    return collectionsApi.getConsultants(options).then((resp) => {
      consultants.value = resp.data.data;
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      return resp.data.data;
    });
  }
  async function requestAllConsultants() {
    return consultantApi.getAllConsultants().then((resp) => {
      consultantsAll.value = resp.data.data;
      return resp.data.data;
    });
  }

  const getConsultants = computed(() => {
    return consultants.value.map((item: any) => {
      return { label: item.fullName, value: item.userId };
    });
  });
  const getConsultantsAll = computed(() => {
    return consultantsAll.value.map((item: any) => {
      return { label: item.fullName, value: item.userId };
    });
  });

  function setNewConsultantInfo(payload: TPersonalDataPayload) {
    if (consultantId === undefined) return;
    return consultantApi
      .setConsultantInfo(consultantId, payload)
      .then(() => notify({ type: "positive", message: "Данные успешно сохранены" }))
      .catch(() => notify({ type: "negative", message: "Не удалось сохранить данные" }));
  }

  function setNewConsultantPhoto(payload: TPersonalDataPayload) {
    if (consultantId === undefined) return;
    return consultantApi
      .setConsultantPhoto(payload)
      .then(() => notify({ type: "positive", message: "Фотография успешно сохранено" }))
      .catch(() => notify({ type: "negative", message: "Не удалось сохранить фотографию" }));
  }

  function setConsultantFeedBack(payload: TConsultantFeedbackPayload) {
    return consultantApi.setConsultantFeedBack(payload);
  }

  function getAllParents() {
    return consultantApi.getAllParentedsForConsultant().then((resp) => (allParents.value = resp.data.data));
  }

  async function setParentQuestion(questionnaireId: number, parentedId: number) {
    try {
      await consultantApi.setParentedToQuestionnaire({ questionnaireId, parentedId });
      return notify({ type: "positive", message: "Данные успешно сохранены" });
    } catch {
      return notify({ type: "negative", message: "Не удалось сохранить данные" });
    }
  }

  return {
    requestReports,
    reportsModel,
    consultantInfo,
    consultants,
    getReports,
    createReport,
    getConsultantInfo,
    getConsultants,
    getConsultantsAll,
    setNewConsultantInfo,
    setNewConsultantPhoto,
    setConsultantFeedBack,
    requestAllConsultants,
    getAllParents,
    allParents,
    getParentsList,
    setParentQuestion,
    requestConsultants,
    page,
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { consultantApi } from "@/api";
import { toConsultantReportsData } from "@/api/Consultant/mappers";
import {
  TAllConsultants,
  TGetConsultantInfo,
  TGetConsultantReportsData,
  TGetConsultantReportsFilter,
} from "@/api/Consultant/types";
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
  const consultants = ref<TAllConsultants>([]);
  const allParents = ref<TConsultantParentsPayload[]>([]);

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

  function getConsultantInfo() {
    if (consultantId === undefined) return;
    consultantApi.getConsultantInfo(consultantId).then((resp) => (consultantInfo.value = resp.data.data[0]));
  }

  async function requestAllConsultants() {
    return consultantApi.getAllConsultants().then((resp) => {
      consultants.value = resp.data.data;
      return resp.data.data;
    });
  }

  const getConsultants = computed(() => {
    return consultants.value.map((item: any) => {
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

  function setParentQuestion(questionnaireId: number, parentedId: number) {
    return consultantApi
      .setParentedToQuestionnaire({ questionnaireId, parentedId })
      .then(() => notify({ type: "positive", message: "Данные успешно сохранены" }))
      .catch(() => notify({ type: "negative", message: "Не удалось сохранить данные" }));
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
    setNewConsultantInfo,
    setNewConsultantPhoto,
    setConsultantFeedBack,
    requestAllConsultants,
    getAllParents,
    allParents,
    getParentsList,
    setParentQuestion,
  };
});

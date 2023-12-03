import { defineStore } from "pinia";
import { ref } from "vue";

import { consultantApi } from "@/api";
import { toConsultantReportsData } from "@/api/Consultant/mappers";
import { TGetConsultantInfo, TGetConsultantReportsData, TGetConsultantReportsFilter } from "@/api/Consultant/types";
import { TConsultantFeedbackPayload } from "@/components/modals/ConsultantFeedback/types";
import { TPersonalDataPayload } from "@/pages/AccountPage/ConsultantTabs/types";
import notify from "@/utils/notify";

import { useAuthStore } from "./authStore";

export const useConsultantStore = defineStore("consultantStore", () => {
  const reportsModel = ref<TGetConsultantReportsData>();
  const consultantInfo = ref<TGetConsultantInfo>();
  const authStore = useAuthStore();
  const consultantId = authStore.getUserId;

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

  return {
    requestReports,
    reportsModel,
    consultantInfo,
    getReports,
    createReport,
    getConsultantInfo,
    setNewConsultantInfo,
    setNewConsultantPhoto,
    setConsultantFeedBack,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

import { consultantApi } from "@/api";
import { toConsultantReportsData } from "@/api/Consultant/mappers";
import { TGetConsultantInfo, TGetConsultantReportsData, TGetConsultantReportsFilter } from "@/api/Consultant/types";

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
      const resp = consultantApi.createReport(consultantId, payload).then((resp) => resp.status);
      return Promise.resolve(resp);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  function getConsultantInfo() {
    if (consultantId === undefined) return;
    consultantApi.getConsultantInfo(consultantId).then((resp) => (consultantInfo.value = resp.data.data[0]));
  }
  return { requestReports, reportsModel, getReports, createReport, consultantInfo, getConsultantInfo };
});

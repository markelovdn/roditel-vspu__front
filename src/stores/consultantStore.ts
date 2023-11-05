import { defineStore } from "pinia";
import { ref } from "vue";

import { consultantApi } from "@/api";
import { toConsultantReportsData } from "@/api/Consultant/mappers";
import { TGetConsultantReportsData, TGetConsultantReportsFilter } from "@/api/Consultant/types";

import { useAuthStore } from "./authStore";

export const useConsultantStore = defineStore("consultantStore", () => {
  const reportsModel = ref<TGetConsultantReportsData>();
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
    consultantApi.getReports(consultantId, filters).then((resp) => toConsultantReportsData(resp.data));
  }

  return { requestReports, reportsModel, getReports };
});

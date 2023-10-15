import { defineStore } from "pinia";
import { ref } from "vue";

import { consultantApi } from "@/api";
import { TGetConsultantReportsFilter } from "@/api/Consultant/types";

import { useAuthStore } from "./authStore";

export const useConsultantStore = defineStore("consultantStore", () => {
  const reportsModel = ref<{ data: Record<string, unknown>[]; meta: { currentPage: number; totalPages: number } }>();
  const authStore = useAuthStore();

  const consultantId = authStore.getUserId;
  function getReports(filters: TGetConsultantReportsFilter) {
    if (consultantId === undefined) return;
    consultantApi.getReports(consultantId, filters).then((resp) => (reportsModel.value = resp.data));
  }

  return {
    reportsModel,
    getReports,
  };
});

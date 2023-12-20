import { defineStore } from "pinia";
import { ref } from "vue";

import { adminsApi } from "@/api";
import { TConsultantForAdmin, TGetConsultantsForAdminFilter } from "@/api/Admin/types";
import { TWebinarPayload } from "@/api/Webinars/types";
import notify from "@/utils/notify";

export const useConsultantsAdminStore = defineStore("consultantAdminStore", () => {
  const consultants = ref<TConsultantForAdmin[]>([]);

  const page = ref({
    current: 1,
    max: 1,
  });

  async function requestAllConsultants(filters: TGetConsultantsForAdminFilter) {
    await adminsApi.getAllConsultantsForAdmin(filters).then((resp) => {
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      consultants.value = resp.data.data;
    });
  }

  async function updateContractNumber(consultantId: number | null, contractNumber: string) {
    await adminsApi.updateContractNumber(consultantId, contractNumber).then(() => {
      const consultantIndex = consultants.value.findIndex((c) => c.consultantId === consultantId);
      if (consultantIndex !== -1) {
        consultants.value[consultantIndex].contractNumber = contractNumber;
      }
      notify({ type: "positive", message: "Номер договора успешно обновлен" });
    });
  }

  async function deleteConsultant(consultantId: number) {
    await adminsApi.deleteConsultant(consultantId).then(() => {
      const consultantIndex = consultants.value.findIndex((c) => c.consultantId === consultantId);
      if (consultantIndex !== -1) {
        consultants.value.splice(consultantIndex, 1);
      }
      notify({ type: "positive", message: "Консультант успешно удален" });
    });
  }

  function createWebinar(data: TWebinarPayload) {
    adminsApi.createWebinar(data);
  }
  async function getLectors() {
    const resp = await adminsApi.getLectors();
    return resp.data.data;
  }

  return {
    consultants,
    page,
    requestAllConsultants,
    updateContractNumber,
    deleteConsultant,
    createWebinar,
    getLectors,
  };
});

import { defineStore } from "pinia";

import { parentsApi } from "@/api";
import { TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";

// import notify from "@/utils/notify";
import { useAuthStore } from "./authStore";

export const useConsultantStore = defineStore("consultantStore", () => {
  const authStore = useAuthStore();
  const parentId = authStore.getUserId;

  function setParentInfo(data: TPersonalDataParentPayload) {
    if (parentId === undefined) return;
    parentsApi.setParentInfo(parentId, data);
  }

  function setParentRegion(regionId: number) {
    if (parentId === undefined) return;
    parentsApi.setParentRegion(regionId);
  }

  return {
    setParentInfo,
    setParentRegion,
  };
});

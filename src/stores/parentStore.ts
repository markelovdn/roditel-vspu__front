import { defineStore } from "pinia";

import { parentsApi } from "@/api";
import { TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";

// import notify from "@/utils/notify";
import { useAuthStore } from "./authStore";

export const useParentStore = defineStore("parentStore", () => {
  const authStore = useAuthStore();
  const parentId = authStore.getUserId;

  function setParentInfo(data: TPersonalDataParentPayload) {
    if (parentId === undefined) return;
    return parentsApi.setParentInfo(parentId, data);
  }

  return {
    setParentInfo,
  };
});

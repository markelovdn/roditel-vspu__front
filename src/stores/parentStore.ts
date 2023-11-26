import { defineStore } from "pinia";
import { ref } from "vue";

import { parentsApi } from "@/api";
import { TPersonalDataChildrenPayload, TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";

// import notify from "@/utils/notify";
import { useAuthStore } from "./authStore";

export const useParentStore = defineStore("parentStore", () => {
  const childrenData = ref<TPersonalDataChildrenPayload[]>([]);

  const authStore = useAuthStore();
  const parentId = authStore.getUserId;

  function getChildren() {
    if (parentId === undefined) return;
    return parentsApi.getChildren(parentId).then((res) => (childrenData.value = res.data.data));
  }

  function setChildrenAge(age: number) {
    if (parentId === undefined) return;

    return parentsApi.setChildrenAge(parentId, age);
  }

  function setParentInfo(data: TPersonalDataParentPayload) {
    if (parentId === undefined) return;
    return parentsApi.setParentInfo(parentId, data);
  }

  return {
    childrenData,
    setParentInfo,
    getChildren,
    setChildrenAge,
  };
});

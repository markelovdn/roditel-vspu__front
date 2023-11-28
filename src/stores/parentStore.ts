import { defineStore } from "pinia";
import { ref } from "vue";

import { parentsApi } from "@/api";
import { TPersonalDataChildrenPayload, TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";
import notify from "@/utils/notify";

import { useAuthStore } from "./authStore";

export const useParentStore = defineStore("parentStore", () => {
  const childrenData = ref<TPersonalDataChildrenPayload[]>([]);

  const authStore = useAuthStore();
  const parentId = authStore.getUserId;

  function getChildren() {
    if (parentId === undefined) return;
    return parentsApi.getChildren(parentId).then((res) => (childrenData.value = res.data.data));
  }

  function deleteChildren(children_id: number) {
    return parentsApi
      .deleteChildren(children_id)
      .then(() => notify({ type: "positive", message: "Ребенок успешно удален" }))
      .catch(() => notify({ type: "negative", message: "Не удалось удалить ребенка" }));
  }

  function setParentInfo(data: TPersonalDataParentPayload) {
    if (parentId === undefined) return;
    return parentsApi
      .setParentInfo(parentId, data)
      .then(() => notify({ type: "positive", message: "Данные успешно сохранены" }))
      .catch(() => notify({ type: "negative", message: "Не удалось сохранить данные" }));
  }

  return {
    childrenData,
    setParentInfo,
    getChildren,
    deleteChildren,
  };
});

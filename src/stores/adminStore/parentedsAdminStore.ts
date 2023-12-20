import { defineStore } from "pinia";
import { ref } from "vue";

import { adminsApi } from "@/api";
import { TGetParentedsForAdminFilter, TParentedForAdmin } from "@/api/Admin/types";
import notify from "@/utils/notify";

export const useParentedsAdminStore = defineStore("parentedsAdminStore", () => {
  const parenteds = ref<TParentedForAdmin[]>([]);

  const page = ref({
    current: 1,
    max: 1,
  });

  async function requestAllParenteds(filters: TGetParentedsForAdminFilter) {
    await adminsApi.getAllParentedsForAdmin(filters).then((resp) => {
      page.value.max = resp.data.meta.last_page;
      page.value.current = resp.data.meta.current_page;
      parenteds.value = resp.data.data;
      console.log(parenteds);
    });
  }

  async function deleteParented(parentedId: number) {
    await adminsApi.deleteConsultant(parentedId).then(() => {
      const parentedIndex = parenteds.value.findIndex((p) => p.parentedId === parentedId);
      if (parentedIndex !== -1) {
        parenteds.value.splice(parentedIndex, 1);
      }
      notify({ type: "positive", message: "Родитель успешно удален" });
    });
  }

  return {
    requestAllParenteds,
    deleteParented,
    parenteds,
    page,
  };
});

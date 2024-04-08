import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { collectionsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";

export const useCollectionsStore = defineStore("collectionsStore", () => {
  const regions = ref<TCollectionItem[]>([]);
  const specializations = ref<TCollectionItem[]>([]);
  const professions = ref<TCollectionItem[]>([]);

  async function requestRegions() {
    await collectionsApi.getRegions().then((resp) => {
      regions.value = resp.data.data;
    });
  }
  async function requestSpecializations() {
    collectionsApi.getSpecializations().then((resp) => (specializations.value = resp.data.data));
  }
  function requestProfessions() {
    collectionsApi.getProfessions().then((resp) => (professions.value = resp.data.data));
  }

  // function setRegions(data: TCollectionItem[]) {
  //   regions.value = data;
  // }

  const getRegions = computed(() => {
    return regions.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  const getSpecializations = computed(() => {
    return specializations.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  const getSpecializationsWithAll = computed(() => {
    return [{ label: "Все", value: 0 }, ...getSpecializations.value];
  });
  const getProfessions = computed(() => {
    return professions.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  return {
    regions,
    specializations,
    professions,
    requestRegions,
    requestSpecializations,
    requestProfessions,
    getRegions,
    getSpecializations,
    getSpecializationsWithAll,
    getProfessions,
  };
});

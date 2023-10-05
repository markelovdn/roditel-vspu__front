import { collectionsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";
import { computed } from "vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollectionsStore = defineStore("collectionsStore", () => {
  const regions = ref<TCollectionItem[]>();
  const specializations = ref<TCollectionItem[]>();
  const professions = ref<TCollectionItem[]>();

  function requestRegions() {
    collectionsApi.getRegions().then((resp) => (regions.value = resp.data.data));
  }
  function requestSpecializations() {
    collectionsApi.getSpecializations().then((resp) => (specializations.value = resp.data.data));
  }
  function requestProfessions() {
    collectionsApi.getProfessions().then((resp) => (professions.value = resp.data.data));
  }
  const getRegions = computed(() => {
    return regions.value?.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  const getSpecializations = computed(() => {
    return specializations.value?.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    });
  });
  const getProfessions = computed(() => {
    return professions.value?.map((item: TCollectionItem) => {
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
    getProfessions,
  };
});

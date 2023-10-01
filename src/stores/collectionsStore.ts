import { collectionsApi } from "@/api";
import { TCollectionItem } from "@/api/Collections/types";
import { computed } from "@vue/reactivity";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollectionsStore = defineStore("CollectionsStore", () => {
  const regions = ref();
  const specializations = ref();
  const professions = ref();

  function requestRegions() {
    return collectionsApi.getRegions();
  }
  function requestSpecializations() {
    return collectionsApi.getSpecializations();
  }
  function requestProfessions() {
    return collectionsApi.getProfessions();
  }
  const getRegions = computed(() =>
    regions.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    }),
  );
  const getSpecializations = computed(() =>
    specializations.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    }),
  );
  const getProfessions = computed(() =>
    professions.value.map((item: TCollectionItem) => {
      return { label: item.title, value: item.id };
    }),
  );
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

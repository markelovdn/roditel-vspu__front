import { collectionsApi } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollectionsStore = defineStore("CollectionsStore", () => {
  const regions = ref();
  const specializations = ref();
  const professions = ref();

  function getRegions() {
    return collectionsApi.getRegions();
  }
  function getSpecializations() {
    return collectionsApi.getSpecializations();
  }
  function getProfessions() {
    return collectionsApi.getProfessions();
  }

  return { regions, specializations, professions, getRegions, getSpecializations, getProfessions };
});

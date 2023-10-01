import { defineStore } from "pinia";
import { getRequest, regionsURL, specializationsURL, professionsURL } from "@/api/Collections/CollectionsApiService";

export const useCollectionsStore = defineStore("CollectionsStore", () => {
  const regions = getRequest(regionsURL)
  const specializations = getRequest(specializationsURL)
  const professions = getRequest(professionsURL)

  return { regions, specializations, professions }
})

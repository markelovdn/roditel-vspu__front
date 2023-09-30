import { defineStore } from "pinia";
import { commonRequest, regionsURL, specializationsURL, professionsURL } from "@/api/commonRequest";

export const useCommonStore = defineStore("commonStore", () => {
  const regions = commonRequest(regionsURL)
  const specializations = commonRequest(specializationsURL)
  const professions = commonRequest(professionsURL)

  return { regions, specializations, professions }

})

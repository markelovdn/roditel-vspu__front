import { ref } from "vue";
import { defineStore } from "pinia";
import { regionsRequest } from "@/api/regionsRequest.ts";
import { type TRequestItem } from "@/components/modals/RegistrationModal/types";

export const useRegionsStore = defineStore("regionsStore", () => {
  const regions = ref<TRequestItem[]>()

  const setRegions = async () => {
    regions.value = await regionsRequest();
  }

// export const useRegionsStore = defineStore("regionsStore", {
//   state: () => {
//     return {
//       regions: [] as TRequestItem[],
//     };
//   },

//   actions: {
//     async setRegions() {
//       this.regions = await regionsRequest()
//     }
//   },

  return {regions, setRegions}

})

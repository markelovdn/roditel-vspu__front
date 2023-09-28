import { defineStore } from "pinia";
import {regionsRequest} from "@/api/regionsRequest.ts";
import { type TRequestItems } from "@/components/modals/RegistrationModal/types";

export const useRegionsStore = defineStore("regionsStore", {
  state: () => {
    return {
      regions: [] as TRequestItems[],
    };
  },

  actions: {
    async setRegions() {
      this.regions = await regionsRequest()
    }
  },
})

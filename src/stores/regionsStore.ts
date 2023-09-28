import { defineStore } from "pinia";
import axios from "@/common/axios";
import {regionsRequest} from "@/api/regionsRequest.ts";
import { type TRequestItems } from "@/components/modals/RegistrationModal/types";

export const useRegionsStore = defineStore("regionsStore", {
  state: () => {
    return {
      regions: [] as TRequestItems[],
    };
  },

  actions: {
    setRegions() {
      this.regions = regionsRequest()
      return this.regions;
    }
  //   async regionsRequest() {
  //     await axios
  //       .get("/api/regions")
  //       .then((response) => {
  //         this.regions = response.data.data;
  //       })
  //       .catch((errors) => {
  //         console.log(errors);
  //       });
  //   },
  },
})

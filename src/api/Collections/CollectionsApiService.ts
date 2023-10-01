import axios from "@/common/axios";

export class CollectionsApiService {
  //TODO: указать типы response
  getRegions() {
    return axios.get("/regions");
  }
  getSpecializations() {
    return axios.get("/specializations");
  }
  getProfessions() {
    return axios.get("/professions");
  }
}

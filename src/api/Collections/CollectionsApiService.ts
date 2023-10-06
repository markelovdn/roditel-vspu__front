import axios from "@/common/axios";
import { ConsultantsResponse } from "@/components/common/Home/ConsultantsSlider/types";

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
  getConsultants() {
    return axios.get<ConsultantsResponse>("/consultants");
  }
}

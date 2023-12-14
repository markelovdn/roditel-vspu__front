import { TWebinarsRequestOption } from "@/api/Webinars/types";
import axios from "@/common/axios";
import { ConsultantsResponse } from "@/components/common/Home/ConsultantsSlider/types";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

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
  getConsultants(filters: TWebinarsRequestOption) {
    // return axios.get<ConsultantsResponse>("/consultants");
    return axios.get<ConsultantsResponse>(useUrlParams("/consultants", useParamBuilder(filters)));
  }
}

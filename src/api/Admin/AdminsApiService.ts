import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TWebinarPayload, TWebinarsLector } from "../Webinars/types";
import {
  TGetConsultantsForAdminData,
  TGetConsultantsForAdminFilter,
  TGetParentedsForAdminData,
  TGetParentedsForAdminFilter,
} from "./types";

export class AdminsApiService {
  getAllConsultantsForAdmin(filters: TGetConsultantsForAdminFilter) {
    return axios.get<TGetConsultantsForAdminData>(useUrlParams("/getConsultantsForAdmin", useParamBuilder(filters)));
  }

  updateContractNumber(consultantId: number | null, contractNumber: string) {
    return axios.put(`/updateContractNumber/${consultantId}`, { contractNumber });
  }

  deleteConsultant(consultantId: number) {
    return axios.delete(`/consultants/${consultantId}`);
  }

  getAllParentedsForAdmin(filters: TGetParentedsForAdminFilter) {
    return axios.get<TGetParentedsForAdminData>(useUrlParams("/parenteds", useParamBuilder(filters)));
  }

  createWebinar(data: TWebinarPayload) {
    return axios.post("/webinars", data);
  }
  getLectors() {
    return axios.get<{ data: TWebinarsLector[] }>("/lectors");
  }

  deleteParented(parentedId: number) {
    return axios.delete(`/parenteds/${parentedId}`);
  }
}

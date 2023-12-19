import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

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

  deleteParented(parentedId: number) {
    return axios.delete(`/parenteds/${parentedId}`);
  }
}

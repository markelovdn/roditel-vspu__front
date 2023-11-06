import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TGetConsultantReportsFilter, TGetConsultantReportsResponseData } from "./types";

export class ConsultantApiService {
  getReports(consultantId: number | string, filters: TGetConsultantReportsFilter) {
    return axios.get<TGetConsultantReportsResponseData>(
      useUrlParams(`/consultant/${consultantId}/reports`, useParamBuilder(filters)),
    );
  }
  createReport(consultantId: number | string, payload: FormData) {
    return axios.post<any>(`/consultant/${consultantId}/reports`, payload);
  }

  getConsultantInfo(consultantId: number) {
    return axios.get(`/consultants/${consultantId}`);
  }
}

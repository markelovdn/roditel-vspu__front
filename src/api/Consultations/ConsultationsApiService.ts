import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TConsultation, TConsultationPayload, TGetConsultationsFilter } from "./types";

export class ConsultationsApiService {
  getConsultations(userId: number | string, filters: TGetConsultationsFilter) {
    return axios.get<{ data: TConsultation[] }>(
      useUrlParams(`/users/${userId}/consultations`, useParamBuilder(filters)),
    );
  }

  addConsultation(userId: number | string, consultation: TConsultationPayload<number | null>) {
    return axios.post<TConsultationPayload<number | null>>(`/users/${userId}/consultations`, consultation);
  }

  deleteConsultation(consultationId: number | string) {
    return axios.delete(`/questionnaires/${consultationId}`);
  }
  sendMessage(text: string, consultationId: number) {
    axios.post(`/consultations/${consultationId}/messages`, { consultationId, text });
  }
}

import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TConsultation, TConsultationPayload, TGetConsultationsFilter } from "./types";

export class ConsultationsApiService {
  getConsultations(userId: number | string, filters: TGetConsultationsFilter) {
    return axios.get<{ data: TConsultation[] }>(
      useUrlParams(`/users/${userId}/consultations`, useParamBuilder(filters)),
    );
  }

  addQuestionnaire(userId: number | string, consultation: TConsultationPayload<number>) {
    return axios.post<TConsultationPayload<number>>(`/user/${userId}/consultations`, consultation);
  }

  deleteQuestionnaire(consultationId: number | string) {
    return axios.delete(`/questionnaires/${consultationId}`);
  }
  sendMessage(text: string, consultationId: number) {
    axios.post(`/consultations/${consultationId}/messages`, { consultationId, text });
  }
}

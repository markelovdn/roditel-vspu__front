import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TConsultationPayload, TGetConsultationsFilter } from "./types";

export class ConsultationsApiService {
  getConsultations(userId: number | string, filters: TGetConsultationsFilter) {
    return axios.get(useUrlParams(`/users/${userId}/consultations`, useParamBuilder(filters)));
  }

  addQuestionnaire(userId: number | string, consultation: TConsultationPayload<number>) {
    return axios.post<TConsultationPayload<number>>(`/user/${userId}/consultations`, consultation);
  }
  // addQuestionnaire(userId: number | string, consultation: TConsultationPayload<number>) {
  //   return axios.post<TConsultationPayload<number>>(`/user/${userId}/consultations`, {
  //     title: consultation.title,
  //     consultantId: consultation.consultantId,
  //     allConsultants: consultation.allConsultants,
  //     messageText: consultation.messageText,
  //     specializationId: consultation.specializationId,
  //   });
  // }

  deleteQuestionnaire(consultationId: number | string) {
    return axios.delete(`/questionnaires/${consultationId}`);
  }
}

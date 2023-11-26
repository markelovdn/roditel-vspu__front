import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TConsultation, TConsultationPayload, TGetConsultationsFilter } from "./types";

export class ConsultationsApiService {
  getConsultations(userId: number | string, filters: TGetConsultationsFilter) {
    //TODO: убрать на беке и тут обертку в {data}
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
  sendMessage(message: string, id: number) {
    //TODO: сделать динамическим id консультации
    axios.post(`/consultations/${id}/messages`, {
      consultationId: id,
      text: message,
    });
    console.log(message);
  }
}

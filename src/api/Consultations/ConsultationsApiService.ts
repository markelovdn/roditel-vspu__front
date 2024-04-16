import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import notify from "../../utils/notify";
import { TConsultation, TConsultationPayload, TGetConsultationsFilter } from "./types";

export class ConsultationsApiService {
  getConsultations(userId: number | string, filters: TGetConsultationsFilter) {
    return axios.get<{ data: TConsultation[] }>(
      useUrlParams(`/users/${userId}/consultations`, useParamBuilder(filters)),
    );
  }

  addConsultation(userId: number | string, consultation: TConsultationPayload<number | null>) {
    console.log(consultation);
    return axios.post<TConsultationPayload<number | null>>(`/users/${userId}/consultations`, consultation);
  }

  deleteConsultation(consultationId: number | string) {
    return axios.delete(`/questionnaires/${consultationId}`);
  }
  sendMessage(text: string, consultationId: number) {
    axios.post(`/consultations/${consultationId}/messages`, { consultationId, text }).catch((err) => {
      console.log(err);
      //TODO: обработать ошибку 423
    });
  }
  closeConsultation(consultationId: number) {
    axios
      .post(`/closeConsultation/`, { consultationId })
      .then(() => {
        notify({ type: "positive", message: "Консультация успешно закрыта" });
      })
      .catch((err) => {
        notify({ type: "negative", message: "Не удалось Закрыть консультацию" });
        console.log(err);
      });
  }
}

import axios from "@/common/axios";
import { TConsultantParentsPayload } from "@/components/modals/ConsultantChoiceParentsModal/types";
import { TConsultantFeedbackPayload } from "@/components/modals/ConsultantFeedback/types";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";
import { TPersonalDataPayload } from "@/pages/AccountPage/ConsultantTabs/types";

import { TGetAllConsultants, TGetConsultantReportsFilter, TGetConsultantReportsResponseData } from "./types";

export class ConsultantApiService {
  getReports(consultantId: number | string, filters: TGetConsultantReportsFilter) {
    return axios.get<TGetConsultantReportsResponseData>(
      useUrlParams(`/consultant/${consultantId}/reports`, useParamBuilder(filters)),
    );
  }

  getReportsForAdmin(filters: TGetConsultantReportsFilter) {
    return axios.get<TGetConsultantReportsResponseData>(
      useUrlParams(`/getConsultantsReports?XDEBUG_SESSION=VSCODE`, useParamBuilder(filters)),
    );
  }
  createReport(consultantId: number | string, payload: FormData) {
    return axios.post<any>(`/consultant/${consultantId}/reports`, payload);
  }

  getConsultantInfo(consultantId: number) {
    return axios.get(`/consultants/${consultantId}`);
  }

  getAllConsultants() {
    return axios.get<TGetAllConsultants>("/consultants?all=true");
  }

  setConsultantInfo(consultantId: number | string, data: TPersonalDataPayload) {
    const splitName: Array<string> = (data.name as string).split(" ");

    return axios.put<any>(`/users/${consultantId}`, {
      firstName: splitName[0],
      secondName: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      specializationId: data.specializationId,
      professionId: data.professionId,
      description: data.description,
    });
  }

  setConsultantPhoto(data: TPersonalDataPayload) {
    const formData = new FormData();
    formData.append("photo", data.image as File);

    return axios.post<any>(`/uploadPhotoConsultant`, formData);
  }

  setConsultantFeedBack(data: TConsultantFeedbackPayload) {
    const payload = {
      consultation_id: data.consultationId,
      ratings: [
        { rating_question_id: 1, rating_answer: data.quality },
        { rating_question_id: 2, rating_answer: data.conditions },
        { rating_question_id: 3, rating_answer: data.availability },
        { rating_question_id: 4, rating_answer: data.politeness },
        { rating_question_id: 5, rating_answer: data.complaints },
        { rating_question_id: 6, rating_answer: data.proposals },
      ],
    };

    return axios.post<{ message: string }>(`/consultationRatings`, payload);
  }

  getAllParentedsForConsultant() {
    return axios.post<{ data: TConsultantParentsPayload[] }>(`/getAllParentedsForConsultant?all=true`);
  }

  setParentedToQuestionnaire(payload: { questionnaireId: number; parentedId: number }) {
    return axios.post(`/setParentedToQuestionnaire`, payload);
  }
}

import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";
import { TPersonalDataPayload } from "@/pages/AccountPage/ConsultantTabs/types";

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
}

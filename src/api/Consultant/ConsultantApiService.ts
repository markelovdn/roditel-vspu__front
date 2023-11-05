import axios from "@/common/axios";

import { TGetConsultantReportsFilter, TGetConsultantReportsResponseData } from "./types";

export class ConsultantApiService {
  //TODO: указать типы response
  getReports(consultantId: number | string, filters: TGetConsultantReportsFilter) {
    const query = new URLSearchParams({ ...filters, page: filters.page.toString() } || {});
    //TODO: написать функцию принимающуу url и параметры query, на выходе целая строка собранная
    // учесть то, что URLSearchParams хочет на вход параметры в виде строки, нужен для этого конвертер
    return axios.get<TGetConsultantReportsResponseData>(
      `/consultant/${consultantId}/reports${query ? "?" + query : ""}`,
    );
  }
}

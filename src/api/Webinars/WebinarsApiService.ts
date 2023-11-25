import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TRequestWebinarsLectors, TWebinarData, TWebinarsRequestOption, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TRequestWebinarsLectors>("/lectors");
  }

  getWebinars(filters: TWebinarsRequestOption) {
    return axios.get<TWebinarData>(useUrlParams("/webinars", useParamBuilder(filters)));
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
  getWebinarQuestions(id: number) {
    return axios.get<WebinarCategoriesResponse>(`/webinar/${id}/webinarQuestions`);
  }
  registrationPartisipant(webinarId: number, userId: number) {
    return axios.post(`/webinar/${webinarId}/webinarPartisipants`, {
      webinarId,
      userId,
    });
  }
}

import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TRequestWebinarsLectors, TWebinarData, TWebinarsRequestOption, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TRequestWebinarsLectors>("/lectors");
  }

  getWebinars(options: TWebinarsRequestOption) {
    return axios.get<TWebinarData>(useUrlParams("/webinars", useParamBuilder(options)));
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
}

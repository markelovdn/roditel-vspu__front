import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TWebinarData, TWebinarsLectors, TWebinarsRequestOption, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TWebinarsLectors>("/webinarLectors");
  }

  getWebinars(options: TWebinarsRequestOption) {
    return axios.get<TWebinarData>(useUrlParams("/webinars", useParamBuilder(options)));
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
}

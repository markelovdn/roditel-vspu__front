import axios from "@/common/axios";
import { StringRecord } from "@/utils/baseTypes";
import { buildUrl } from "@/utils/objectHelpers";

import { TWebinarData, TWebinarsLectors, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TWebinarsLectors>("/webinarLectors");
  }

  getWebinars<T extends StringRecord>(options?: T) {
    return axios.get<TWebinarData>(buildUrl("/webinars", options));
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
}

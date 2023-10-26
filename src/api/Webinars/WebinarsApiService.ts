import { Ref } from "vue";

import axios from "@/common/axios";
import { useUrlParams } from "@/hooks/useParamBuilder ";

import { TWebinarData, TWebinarsLectors, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TWebinarsLectors>("/webinarLectors");
  }

  getWebinars(options?: Readonly<Ref<URLSearchParams>>) {
    return axios.get<TWebinarData>(useUrlParams("/webinars", options));
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
}

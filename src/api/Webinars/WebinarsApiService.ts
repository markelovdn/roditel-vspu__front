import axios from "@/common/axios";

import { TWebinarData, TWebinarsLectors, TWebinarsRequestOption, WebinarCategoriesResponse } from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TWebinarsLectors>("/webinarLectors");
  }
  getWebinars(options?: TWebinarsRequestOption) {
    return axios.get<TWebinarData>(`/webinars?${new URLSearchParams(options as string[][]).toString()}`);
  }
  getCategories() {
    return axios.get<WebinarCategoriesResponse>("/webinarCategories");
  }
}

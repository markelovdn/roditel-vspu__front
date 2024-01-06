import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import {
  TRequestWebinarsLectors,
  TWebinarData,
  TWebinarPayload,
  TWebinarsData,
  TWebinarsLector,
  TWebinarsRequestOption,
  WebinarCategoriesResponse,
} from "./types";

export class WebinarsApiService {
  getLectors() {
    return axios.get<TRequestWebinarsLectors>("/lectors");
  }

  getWebinars(filters: TWebinarsRequestOption) {
    return axios.get<TWebinarsData>(useUrlParams("/webinars", useParamBuilder(filters)));
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
  downloadSertificate(webinarId: number, userId: number) {
    return axios.post(`/downloadSertificate`, {
      webinarId,
      userId,
    });
  }

  downloadParticipantList(webinarId: number) {
    return axios.post(`/dowloadWebinarPartisipants`, {
      webinarId: webinarId,
    });
  }

  getLectorInfo(lectorId: number) {
    return axios.get<TWebinarsLector>(`/lectors/${lectorId}`);
  }

  addLector(lector: TWebinarsLector) {
    const formData = new FormData();
    formData.append("photo", lector.lectorPhoto as File);
    formData.append("name", lector.lectorName);
    formData.append("description", lector.lectorDescription);
    formData.append("department", lector.lectorDepartment);

    return axios.post(`/lectors`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateLector(lectorId: number, lector: TWebinarsLector) {
    const formData = new FormData();
    formData.append("name", lector.lectorName);
    formData.append("description", lector.lectorDescription);
    formData.append("department", lector.lectorDepartment);
    formData.append("photo", lector.lectorPhoto as File);

    return axios.post(`/updateLector/${lectorId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addWebinar(webinar: TWebinarPayload) {
    const formData = new FormData();
    formData.append("title", webinar.title);
    formData.append("date", webinar.date);
    formData.append("timeStart", webinar.timeStart);
    formData.append("timeEnd", webinar.timeEnd);
    formData.append("logo", webinar.logo as File);
    formData.append("cost", "0.00");
    formData.append("videoLink", webinar.videoLink);
    formData.append("webinarCategoryId", JSON.stringify(webinar.webinarCategoryId));
    formData.append("questions", JSON.stringify(webinar.webinarQuestions));
    formData.append("lectors", JSON.stringify(webinar.webinarLectorsId));

    return axios.post(`/webinars`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  showWebinar(webinarId: number) {
    return axios.get<TWebinarData>(`/webinars/${webinarId}`);
  }

  updateWebinar(webinarId: number, webinar: TWebinarPayload) {
    const formData = new FormData();
    formData.append("title", webinar.title);
    formData.append("date", webinar.date);
    formData.append("timeStart", webinar.timeStart);
    formData.append("timeEnd", webinar.timeEnd);
    formData.append("logo", webinar.logo as File);
    formData.append("cost", "0.00");
    formData.append("videoLink", webinar.videoLink);
    formData.append("webinarCategoryId", JSON.stringify(webinar.webinarCategoryId));
    formData.append("questions", JSON.stringify(webinar.webinarQuestions));
    formData.append("lectors", JSON.stringify(webinar.webinarLectorsId));
    return axios.post(`/webinar/${webinarId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteWebinar(webinarId: number) {
    return axios.delete(`/webinars/${webinarId}`);
  }
}

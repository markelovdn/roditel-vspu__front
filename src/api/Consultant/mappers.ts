import {
  TConsultantMeta,
  TConsultantResponseMeta,
  TGetConsultantReportsData,
  TGetConsultantReportsResponseData,
} from "./types";

export const toMeta = (meta: TConsultantResponseMeta): TConsultantMeta => {
  return { currentPage: meta.current_page, totalPages: meta.last_page };
};

export const toConsultantReportsData = (data: TGetConsultantReportsResponseData): TGetConsultantReportsData => {
  return {
    data: data.data,
    meta: toMeta(data.meta),
  };
};

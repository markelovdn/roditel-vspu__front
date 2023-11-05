export type TGetConsultantReportsFilter = {
  page: string | number;
  dateBetween?: string;
};
export type TGetConsultantReportsData = {
  data: TConsultantReport[];
  meta: TConsultantMeta;
};
export type TGetConsultantReportsResponseData = {
  data: TConsultantReport[];
  links: any;
  meta: TConsultantResponseMeta;
};

export type TConsultantReport = {
  id: number;
  fileUrl: string;
  fileName: string;
  uploadStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type TConsultantResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: any[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type TConsultantMeta = {
  currentPage: number;
  totalPages: number;
};

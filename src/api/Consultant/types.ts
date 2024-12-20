export type TGetConsultantReportsFilter = {
  page: number;
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
  uploadStatus: "fail" | "success";
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

export interface TGetConsultantInfo {
  id: number;
  userId: number;
  photo: string;
  description: string | null;
  specializations: Array<TSpecialization>;
  profession: {
    id: number;
    title: string;
  };
}

export type TGetAllConsultants = {
  data: TAllConsultants;
};
export type TAllConsultants = Array<{
  userId: number;
  fullName: string;
  consultantId: number;
  specialization: TSpecialization;
}>;
export type TSpecialization = {
  id: number;
  title: string;
};

export type TContractPayload = {
  contractNumber: string;
  consultantId: number;
};

export type TGetConsultantsForAdminFilter = {
  page?: string | number;
  dateBetween?: string;
  status?: string;
  search?: string;
};

export type TGetParentedsForAdminFilter = {
  page?: string | number;
  dateBetween?: string;
  status?: string;
  search?: string;
  consultantId?: number;
};

export type TConsultantForAdmin = {
  userId: number;
  consultantId: number;
  photo: string;
  fullName: string;
  specializationTitle: string;
  contractNumber: string;
  phone: string;
};

export type TGetConsultantsForAdminData = {
  data: Array<TConsultantForAdmin>;
  links: any;
  meta: any;
};

export type TParentedForAdmin = {
  userId: number;
  parentedId: number;
  fullName: string;
  email: string;
};

export type TGetParentedsForAdminData = {
  data: Array<TParentedForAdmin>;
  links: any;
  meta: any;
};

export type TConsultantMeta = {
  currentPage: number;
  totalPages: number;
};

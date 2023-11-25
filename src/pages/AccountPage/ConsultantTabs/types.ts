export type TPersonalDataPayload = {
  name?: string;
  email?: string;
  phone?: string;
  specializationId?: number | null;
  professionId?: number | null;
  description: string;
  image?: File | FileList | null;
};

export type TDateFilter = {
  from: string;
  to: string;
};

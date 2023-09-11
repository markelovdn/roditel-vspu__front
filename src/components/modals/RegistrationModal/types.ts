export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationId: number | null;
  professionId: number | null;
  password: string;
  role_code: string;
  region?: string;
};

export type TSelectItems = {
  id: number;
  title: string;
};
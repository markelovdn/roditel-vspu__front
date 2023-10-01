export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationId?: number | null;
  professionId?: number | null;
  password: string;
  passwordConfirm?: string;
  role_code: string;
  region_id?: number | null;
};
export type TLoginArgs = {
  email: string;
  password: string;
};

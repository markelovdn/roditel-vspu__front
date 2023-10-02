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
export type TUser = {
  email: string;
  first_name: string;
  second_name: string;
  patronymic: string;
  phone: string;
  role_id: number;
  updated_at: string;
  created_at: string;
};

export type TUserRole = {
  id: number;
  code: string;
  title: string;
};

export type TLoginResponse = {
  role: TUserRole;
  token: string;
  user: TUser;
};

export interface TRegistrationResponse extends TLoginResponse {}

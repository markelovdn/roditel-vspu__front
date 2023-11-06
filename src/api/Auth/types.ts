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
  id: number;
  email: string;
  fullName: string;
  first_name: string;
  second_name: string;
  surName: string;
  phone: string;
  role: TUserRole;
};

export type TUserRole = {
  id: number;
  code: "parented" | "consultant" | string;
  title: string;
};

export type TLoginResponse = {
  token: string;
  userData: TUser;
};

export interface TRegistrationResponse extends TLoginResponse {}

export type TForgotPasswordArgs = {
  email: string;
};

export type TResetPasswordArgs = {
  password: string;
  resetToken?: string;
};

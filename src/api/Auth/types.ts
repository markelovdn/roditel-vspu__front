export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationsId?: number | Array<number> | null;
  professionId?: number | null;
  password: string;
  passwordConfirm?: string;
  roleCode: string;
  regionId?: number | null;
};

export type TLoginArgs = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  email: string;
  fullName: string;
  firstName: string;
  secondName: string;
  surName: string;
  phone: string;
  role: TUserRole;
  ragionId: number;
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

export interface TRegistrationResponse extends TLoginResponse {
  message: string[];
}

export type TForgotPasswordArgs = {
  email: string;
};

export type TResetPasswordArgs = {
  password: string;
  resetToken?: string;
};

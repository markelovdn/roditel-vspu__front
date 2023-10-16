export type TResetPasswordPayload = {
  password: string;
  passwordConfirm: string;
  token: string | undefined;
};

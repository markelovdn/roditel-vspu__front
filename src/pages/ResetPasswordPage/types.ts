export type TResetPasswordPayload = {
  password: string;
  passwordConfirm: string;
  resetToken?: string;
};

import type {
  TForgotPasswordArgs,
  TLoginArgs,
  TLoginResponse,
  TRegistrationPayload,
  TRegistrationResponse,
  TResetPasswordArgs,
} from "@/api/Auth/types";
import axios from "@/common/axios";
export class AuthApiService {
  login({ email, password }: TLoginArgs) {
    return axios.post<TLoginResponse>("/login", {
      email,
      password,
    });
  }

  logout() {
    return axios.post("/logout", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  registration(data: TRegistrationPayload) {
    const splitName: Array<string> = data.name.split(" ");

    return axios.post<TRegistrationResponse>("/register", {
      firstName: splitName[1],
      secondName: splitName[0],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      specializationId: data.specializationId,
      professionId: data.professionId,
      password: data.password,
      roleCode: data.roleCode,
      regionId: data.regionId,
    });
  }

  getUserInfo() {
    return axios.get("/getUserByToken", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  forgotPassword({ email }: TForgotPasswordArgs) {
    return axios.post<TForgotPasswordArgs>("/forgotPassword", {
      email: email,
    });
  }

  resetPassword({ password, resetToken }: TResetPasswordArgs) {
    return axios.post<TResetPasswordArgs>("/resetPassword", {
      password: password,
      resetToken: resetToken,
    });
  }
}

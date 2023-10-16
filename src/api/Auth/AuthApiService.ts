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
      first_name: splitName[0],
      second_name: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      specialization_id: data.specializationId,
      profession_id: data.professionId,
      password: data.password,
      role_code: data.role_code,
      region_id: data.region_id,
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

  resetPassword({ password, token }: TResetPasswordArgs) {
    return axios.post<TResetPasswordArgs>("/resetPassword", {
      password: password,
      token: token,
    });
  }
}

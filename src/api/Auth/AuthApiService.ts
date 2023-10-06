import type { TLoginArgs, TLoginResponse, TRegistrationPayload, TRegistrationResponse } from "@/api/Auth/types";
import axios from "@/common/axios";
export class AuthApiService {
  login({ email, password }: TLoginArgs) {
    return axios.post<TLoginResponse>("/login", {
      email,
      password,
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
    return axios.get("/getUserInfo", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}

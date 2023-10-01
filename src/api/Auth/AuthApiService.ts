import axios from "@/common/axios";
import type { TLoginArgs, TRegistrationPayload } from "@/api/Auth/types";

export class AuthApiService {
  login({ email, password }: TLoginArgs) {
    //TODO: указать тип response
    return axios.post("/login", {
      email,
      password,
    });
  }

  registration(data: TRegistrationPayload) {
    const splitName: Array<string> = data.name.split(" ");

    return axios.post("/register", {
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
}

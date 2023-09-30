import axios from "@/common/axios";
import type { TRegistrationPayload } from "@/api/types";

export async function registrationRequest(data:  TRegistrationPayload) {
  const splitName: Array<string> = data.name.split(" ");

  await axios
    .post("/api/register", {
      first_name: splitName[0],
      second_name: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      specialization_id: data.specializationId,
      profession_id: data.professionId,
      password: data.password,
      role_code: data.role_code,
      region_id: data.region_id
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);

      //TODO: Добавить перенаправление после успешной регистрации
    })
    .catch((errors) => {
      console.log(errors);
    });
};
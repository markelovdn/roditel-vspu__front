import axios from "@/common/axios";
import type { TRequestItems } from "@/components/modals/RegistrationModal/types";

export async function regionsRequest() {
  let data: TRequestItems[] = [] 
  await axios
    .get("/api/regions", {})
    .then((response) => {
      data = response.data.data;
      return data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors;
    });

    return data;
}

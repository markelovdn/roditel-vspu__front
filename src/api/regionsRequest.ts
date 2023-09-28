import axios from "@/common/axios";
import type { TRequestItems } from "@/components/modals/RegistrationModal/types";

export async function regionsRequest() {
  await axios
    .get("/api/regions", {})
    .then((response) => {
      const data: TRequestItems[] = response.data.data;
      return data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors;
    });
    const data: TRequestItems[] = []
    return data;
}

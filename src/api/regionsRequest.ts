import axios from "@/common/axios";
import type { TRequestItem } from "@/components/modals/RegistrationModal/types";

export async function regionsRequest() {
  let data: TRequestItem[] = [] 
  await axios
    .get("/api/regions", {})
    .then((response) => {
      data = response.data.data;
    })
    .catch((errors) => {
      console.log(errors);
    });

    return data;
}

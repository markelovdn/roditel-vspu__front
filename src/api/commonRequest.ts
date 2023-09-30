import axios from "@/common/axios";
import type { TCommonRequestItem } from "@/api/types";

export const regionsURL = "/api/regions";
export const specializationsURL = "/api/specializations";
export const professionsURL = "/api/professions";

export async function commonRequest(url: string) {
  let data: TCommonRequestItem[] = [];
  await axios
    .get(url, {})
    .then((response) => {
      data = response.data.data;
    })
    .catch((errors) => {
      console.log(errors);
    });

    return data;
}
import axios from "@/common/axios";
import type { TCollectionsItem } from "@/api/Collections/types";

export const regionsURL = "/api/regions";
export const specializationsURL = "/api/specializations";
export const professionsURL = "/api/professions";

export async function getRequest(url: string) {
  let data: TCollectionsItem[] = [];
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
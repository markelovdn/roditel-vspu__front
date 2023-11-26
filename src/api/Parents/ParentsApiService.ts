import axios from "@/common/axios";
import { TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";

export class ParentsApiService {
  setParentInfo(parentId: number | string, data: TPersonalDataParentPayload) {
    const splitName: Array<string> = (data.name as string).split(" ");

    return axios.put<any>(`/users/${parentId}`, {
      firstName: splitName[0],
      secondName: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
    });
  }

  setParentRegion(regionId: number) {
    return axios.put<any>(`/parenteds/${regionId}`);
  }
}

import axios from "@/common/axios";
import { TPersonalDataChildrenPayload, TPersonalDataParentPayload } from "@/pages/AccountPage/ParentTabs/types";

export class ParentsApiService {
  getChildren(parentId: number | string) {
    return axios.get<{ data: TPersonalDataChildrenPayload[] }>(`/parented/${parentId}/children`);
  }

  deleteChildren(children_id: number | string) {
    return axios.delete<{ message: string }>(`/children/${children_id}/`);
  }

  setParentInfo(parentId: number | string, data: TPersonalDataParentPayload) {
    const splitName: Array<string> = (data.name as string).split(" ");

    return axios.put<{ message: string }>(`/users/${parentId}`, {
      firstName: splitName[0],
      secondName: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      regionId: data.regionId,
      childrens: data.childrens,
    });
  }
}

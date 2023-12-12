import axios from "@/common/axios";
import { useParamBuilder, useUrlParams } from "@/hooks/useParamBuilder ";

import { TNotifications, TNotificationsOptions } from "./types";

export class NotificationApiService {
  getNotifications() {
    return axios.get<TNotifications>(`/notifications`);
  }

  notificationsUpdate(options: TNotificationsOptions) {
    return axios.put(useUrlParams(`/notifications/1`, useParamBuilder(options)));
  }
}

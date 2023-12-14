import { defineStore } from "pinia";
import { ref } from "vue";

import { notificationsApi } from "@/api";
import { TNotifications, TNotificationsOptions } from "@/api/Notification/types";
import { socketConnection } from "@/common/socket";
import { useAuthStore } from "@/stores/authStore";

export const useNotificationStore = defineStore("notificationStore", () => {
  const authStore = useAuthStore();
  const notification = ref<TNotifications>({ count: 0, messages: 0, questionnaires: 0 });

  function getNotifications() {
    return notificationsApi.getNotifications().then((res) => (notification.value = res.data));
  }

  function updateNotifications(options: TNotificationsOptions) {
    notificationsApi.notificationsUpdate(options);
    (Object.keys(options) as Array<keyof TNotificationsOptions>).forEach((key) => (notification.value[key] = 0));
  }

  function connectNotificationChannel(userId: number) {
    if (socketConnection.options.auth.headers.Authorization === "Bearer null" && authStore.token) {
      socketConnection.options.auth.headers.Authorization = `Bearer ${authStore.token}`;
    }
    socketConnection.private(`Notification.${userId}`).listen("NotificationEvent", (event: TNotifications) => {
      notification.value = event;
    });
  }

  getNotifications();
  if (authStore.getUserId) {
    connectNotificationChannel(authStore.getUserId);
  }

  return {
    getNotifications,
    updateNotifications,
    notifications: notification,
    connectNotificationChannel,
  };
});

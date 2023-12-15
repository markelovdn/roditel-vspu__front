import { AxiosError } from "axios";

import axios from "@/common/axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import notify from "@/utils/notify";

export default function useAppInit() {
  function initRespInterceptor() {
    axios.interceptors.response.use(
      (response) => {
        return Promise.resolve(response);
      },
      async (err) => {
        const status = (err as AxiosError)?.response?.status;
        const unauthorizedStatuses = [401, 403];
        if (status && unauthorizedStatuses.includes(status)) {
          notify({ type: "negative", message: "Необходима авторизация" });
          router.push({ name: "Main" });
          await authStore.logout();
        }

        return Promise.reject(err);
      },
    );
  }

  const authStore = useAuthStore();
  initRespInterceptor();

  if (authStore.isLoggedIn) authStore.requestUserInfo();
}

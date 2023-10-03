import { authApi } from "@/api";
import { TLoginArgs, TRegistrationPayload } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("authStore", () => {
  const user = useUserStore();

  const token = ref<null | string>(null);

  function login(payload: TLoginArgs) {
    authApi.login(payload).then((resp) => {
      //TODO: Доделать перенаправление после успешного входа (делается в route guards)
      //TODO: манипуляции с токеном в отдельный composable
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.userData));
      token.value = resp.data.token;
      user.setUser(resp.data.userData);

      console.log(resp.data);
    });
  }
  function registration(payload: TRegistrationPayload) {
    authApi.registration(payload).then((resp) => {
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.userData));
      token.value = resp.data.token;
      user.setUser(resp.data.userData);
      console.log(resp);
    });
  }

  onMounted(() => {
    token.value = localStorage.token || null;
  });
  return { token, login, registration };
});

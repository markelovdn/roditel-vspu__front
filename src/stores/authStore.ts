import { authApi } from "@/api";
import { TLoginArgs, TRegistrationPayload } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("authStore", () => {
  const user = useUserStore();

  const token = ref<null | string>(null);

  function login(payload: TLoginArgs) {
    authApi.login(payload).then((resp) => {
      //TODO: Доделать перенаправление после успешного входа (делается в route guards)
      //TODO: манипуляции с токеном в отдельный composable
      console.log(resp.data);

      localStorage.setItem("token", resp.data.token);
      token.value = resp.data.token;
      user.setUser(resp.data.user);
      user.setUserRole(resp.data.role);
    });
  }
  function registration(payload: TRegistrationPayload) {
    authApi.registration(payload).then((resp) => {
      //! Временно, пока эти данные приходят только из регистрации
      token.value = resp.data.token;
      user.setUser(resp.data.user);
      user.setUserRole(resp.data.role);

      console.log(resp);
    });
  }
  return { token, login, registration };
});

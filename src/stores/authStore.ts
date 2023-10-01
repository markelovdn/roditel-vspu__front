import { authApi } from "@/api";
import { TLoginArgs, TRegistrationPayload } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const token = ref<null | string>(null);

  function login(payload: TLoginArgs) {
    authApi
      .login(payload)
      //TODO: типизировать response (в authApiService)
      .then((resp: { data: { token: string } }) => {
        //TODO: Доделать перенаправление после успешного входа (делается в route guards)
        //TODO: манипуляции с токеном в отдельный composable
        localStorage.setItem("token", resp.data.token);
        token.value = resp.data.token;
      });
  }
  function registration(payload: TRegistrationPayload) {
    authApi
      .registration(payload)
      //TODO: типизировать response (в authApiService)
      .then((resp: unknown) => {
        console.log(resp);
      });
  }
  return { token, login, registration };
});

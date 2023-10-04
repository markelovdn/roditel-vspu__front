import { authApi } from "@/api";
import { TLoginArgs, TRegistrationPayload } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useUserStore } from "./userStore";
import router from "@/router";

export const useAuthStore = defineStore("authStore", () => {
  const user = useUserStore();

  const token = ref<null | string>(null);

  async function login(payload: TLoginArgs) {
    const resp = await authApi.login(payload);
    //TODO: Доделать перенаправление после успешного входа (делается в route guards)
    //TODO: манипуляции с токеном в отдельный composable
    localStorage.setItem("token", resp.data.token);
    token.value = resp.data.token;
    user.setUser(resp.data.userData);
    router.push({ name: "My" });
    return resp.statusText;
  }
  async function registration(payload: TRegistrationPayload) {
    const resp = await authApi.registration(payload);
    localStorage.setItem("token", resp.data.token);
    token.value = resp.data.token;
    user.setUser(resp.data.userData);
    router.push({ name: "My" });
    return resp.statusText;
  }

  onMounted(() => {
    token.value = localStorage.token || null;
  });
  return { token, login, registration };
});

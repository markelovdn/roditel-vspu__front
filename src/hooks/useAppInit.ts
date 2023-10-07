import { useAuthStore } from "@/stores/authStore";

export default function useAppInit() {
  const authStore = useAuthStore();
  authStore.initRespInterceptors();

  if (authStore.isLoggedIn) authStore.requestUserInfo();
}

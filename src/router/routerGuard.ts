import { authApi } from "@/api";
import { useAuthStore } from "@/stores/authStore";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const validateToken = async (): Promise<boolean> => {
  const authStore = useAuthStore();
  if (authStore.token !== null) {
    let checkToken = false;
    const res = await authApi.getUserByToken(authStore.token || "");
    if (res.statusText === "OK") checkToken = true;
    return checkToken;
  }
  return false;
};

const routerGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  if ((await validateToken()) && to.name !== "Main") {
    to.meta.isAuthPage ? next() : next({ name: "Main" });
  } else {
    next();
  }
};

export { routerGuard };

import { useAuthStore } from "@/stores/authStore";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const validateToken = async (): Promise<boolean> => {
  const authStore = useAuthStore();
  if (authStore.token !== null) {
    let checkToken = false;
    // делаем запрос пользователя. Если некорректноЮ, то checkToken = false

    return checkToken;
  } else {
    return false;
  }
};

const routerGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  if (!(await validateToken()) && to.name !== "Main") {
    to.meta.isAuthPage ? next({ name: "Main" }) : next();
  } else {
    next();
  }
};

export { routerGuard };

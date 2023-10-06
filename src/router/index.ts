import { createRouter, createWebHistory } from "vue-router";

import routes from "@/router/routes";
import { useAuthStore } from "@/stores/authStore";
import notify from "@/utils/notify";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const { user } = useAuthStore();

  if (authRequired && !user) {
    notify({ type: "negative", message: "Для доступа к этой странице необходима авторизация" });
    next({ name: "Main" });
  } else {
    next();
  }
});
export default router;

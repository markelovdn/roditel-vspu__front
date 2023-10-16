import { createRouter, createWebHistory } from "vue-router";

import routes from "@/router/routes";
import { useAuthStore } from "@/stores/authStore";
import notify from "@/utils/notify";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach((to) => {
  setTimeout(() => {
    if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, 100);
});
router.beforeEach(async (to, from, next) => {
  const { user } = useAuthStore();

  if (to.meta.requireAuth === undefined && !user) {
    notify({ type: "negative", message: "Для доступа к этой странице необходима авторизация" });
    next({ name: "Main" });
  } else {
    next();
  }
});
export default router;

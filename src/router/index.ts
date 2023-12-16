import { createRouter, createWebHistory } from "vue-router";

import { useScrollControl } from "@/hooks/useScrollControl";
import routes from "@/router/routes";
import { useAuthStore } from "@/stores/authStore";
import notify from "@/utils/notify";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach((to) => {
  const { scrollToElement, scrollToTop } = useScrollControl();
  setTimeout(() => {
    if (to.hash) {
      scrollToElement(to.hash);
    } else {
      scrollToTop();
    }
  }, 100);
});
router.beforeEach(async (to, from, next) => {
  const { user } = useAuthStore();
  document.title = (to.meta.title as string) || "СОЦИАЛЬНО-ПСИХОЛОГИЧЕСКИЙ ЦЕНТР ВГСПУ";
  if ((to.meta.requireAuth === undefined || to.meta.requireAuth === true) && !user) {
    notify({ type: "negative", message: "Для доступа к этой странице необходима авторизация" });
    next({ name: "Main" });
  } else {
    next();
  }
});
export default router;

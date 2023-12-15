import { createRouter, createWebHistory } from "vue-router";

import routes from "@/router/routes";
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
    } else {
      document.querySelector("scroll")?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 100);
});
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  document.title = (to.meta.title as string) || "СОЦИАЛЬНО-ПСИХОЛОГИЧЕСКИЙ ЦЕНТР ВГСПУ";
  if ((to.meta.requireAuth === undefined || to.meta.requireAuth === true) && !token) {
    notify({ type: "negative", message: "Для доступа к этой странице необходима авторизация" });
    next({ name: "Main" });
  } else {
    next();
  }
});
export default router;

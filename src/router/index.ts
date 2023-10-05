import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const { user } = useAuthStore();

  if (authRequired && !user) {
    //TODO: выкидывать Notify, что нужно авторизоваться для доступа к странице
    next({ name: "Main" });
  } else {
    next();
  }
});
export default router;

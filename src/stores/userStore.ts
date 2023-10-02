import { authApi } from "@/api";
import { TUser, TUserRole } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<null | TUser>(null);
  const userRole = ref<null | TUserRole>(null);

  function setUser(User: TUser) {
    user.value = User;
  }
  function setUserRole(UserRole: TUserRole) {
    userRole.value = UserRole;
  }

  return { user, userRole, setUser, setUserRole };
});

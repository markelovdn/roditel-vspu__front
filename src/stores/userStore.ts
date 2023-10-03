import { authApi } from "@/api";
import { TUser, TUserRole } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useUserStore = defineStore("userStore", () => {
  // todo добавить проверку на наличие/корректность localStorage.user
  const user = ref<TUser>(JSON.parse(localStorage.user));

  function setUser(User: TUser) {
    user.value = User;
  }

  return { user, setUser };
});

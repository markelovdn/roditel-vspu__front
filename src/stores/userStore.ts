import { authApi } from "@/api";
import { TUser, TUserRole } from "@/api/Auth/types";
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useAuthStore } from "./authStore";

export const useUserStore = defineStore("userStore", () => {
  const authStore = useAuthStore();
  const user = ref<TUser>();

  authApi
    .getUserByToken(authStore.token || "")
    .then((res) => (user.value = res.data.userData))
    .catch((err) => {
      console.log(err);
    });

  function setUser(User: TUser) {
    user.value = User;
  }

  return { user, setUser };
});

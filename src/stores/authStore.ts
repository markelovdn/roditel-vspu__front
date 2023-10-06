import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { parse, stringify } from "zipson";

import { authApi } from "@/api";
import { TLoginArgs, TRegistrationPayload, TUser } from "@/api/Auth/types";
import axios from "@/common/axios";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const token = ref<null | string>(localStorage.token ?? null);
    const user = ref<TUser>();

    function requestUserInfo() {
      return authApi
        .getUserInfo()
        .then((res) => (user.value = res.data.userData))
        .catch((err) => {
          console.log(err);
        });
    }

    function setUser(data: TUser) {
      user.value = data;
    }

    async function login(payload: TLoginArgs) {
      try {
        const resp = await authApi.login(payload);
        //TODO: манипуляции с токеном в отдельный composable
        localStorage.setItem("token", resp.data.token);
        token.value = resp.data.token;
        //TODO: инфу о пользователе получать с отдельного запроса
        setUser(resp.data.userData);
        return Promise.resolve(resp.data);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    async function registration(payload: TRegistrationPayload) {
      try {
        const resp = await authApi.registration(payload);
        localStorage.setItem("token", resp.data.token);
        token.value = resp.data.token;
        setUser(resp.data.userData);
        return Promise.resolve(resp.data);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    function logout() {
      try {
        localStorage.removeItem("token");
        user.value = undefined;
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    function initRespInterceptors() {
      axios.interceptors.response.use(
        (response) => response,
        async (err) => {
          const status = (err as AxiosError)?.response?.status;
          const unauthorizedStatuses = [401, 403];
          if (status && unauthorizedStatuses.includes(status)) {
            await logout();
          }

          return Promise.reject(err);
        },
      );
    }
    const getUserInfo = computed(() => user.value);
    return { token, login, registration, requestUserInfo, user, getUserInfo, logout, initRespInterceptors };
  },
  {
    persist: {
      paths: ["user"],
      storage: sessionStorage,
      serializer: {
        serialize: stringify,
        deserialize: parse,
      },
    },
  },
);

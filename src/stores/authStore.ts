import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { parse, stringify } from "zipson";

import { authApi } from "@/api";
import { TForgotPasswordArgs, TLoginArgs, TRegistrationPayload, TResetPasswordArgs, TUser } from "@/api/Auth/types";
import axios from "@/common/axios";
import notify from "@/utils/notify";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const token = ref<null | string>(localStorage.token ?? null);
    const user = ref<TUser>();

    function requestUserInfo() {
      return authApi
        .getUserInfo()
        .then((res) => setUser(res.data.userData))
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
    async function logout() {
      try {
        if (localStorage.getItem("token")) {
          await authApi.logout();
        }
        localStorage.removeItem("token");
        user.value = undefined;
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    async function forgotPassword(payload: TForgotPasswordArgs) {
      try {
        await authApi.forgotPassword(payload);
        notify({
          type: "positive",
          message: "Ссылка для восстановления пароля отправлена на указанный email",
        });
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        notify({
          type: "negative",
          message: "Данный email не зарегистрирован, или ссылка для восстановления пароля уже отправлена",
        });
        return Promise.reject(err);
      }
    }
    async function resetPassword(payload: TResetPasswordArgs) {
      try {
        await authApi.resetPassword(payload);
        notify({
          type: "positive",
          message: "Пароль успешно изменен, войдите в личный кабинет",
        });
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        notify({
          type: "negative",
          message: "Время действия ссылки для восстановления пароля истекло",
        });
        return Promise.reject(err);
      }
    }
    function initRespInterceptors() {
      axios.interceptors.response.use(
        (response) => {
          return Promise.resolve(response);
        },
        async (err) => {
          const status = (err as AxiosError)?.response?.status;
          const unauthorizedStatuses = [401, 403];
          if (status && unauthorizedStatuses.includes(status)) {
            notify({ type: "negative", message: "Необходима авторизация" });
            await logout();
          }

          return Promise.reject(err);
        },
      );
    }
    const getUserInfo = computed(() => user.value);
    const isLoggedIn = computed(() => user.value && token.value);
    return {
      forgotPassword,
      token,
      login,
      registration,
      requestUserInfo,
      user,
      getUserInfo,
      logout,
      initRespInterceptors,
      isLoggedIn,
      resetPassword,
    };
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

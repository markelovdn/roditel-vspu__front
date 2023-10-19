<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useModal } from "@/hooks/useModal";
import { emailValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useAuthStore } from "@/stores/authStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { TLoginPayload } from "./types";

const emit = defineEmits(["close", "showRegistrationModal", "showForgotPasswordModal"]);
const router = useRouter();

const data = ref<TLoginPayload>({
  email: "",
  password: "",
});

const { closeModal } = useModal(emit, data);
const authStore = useAuthStore();
const isPwd = ref(true);
const showLoginError = ref(false);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TLoginPayload>(data, emit, {
  email: { requiredValidator, emailValidator },
  password: { requiredValidator },
});
const onLoginSuccess = () => {
  closeModal({ force: true });
  router.push({ name: "My" });
};
const onLoginFail = () => (showLoginError.value = true);
const handleLogin = () => {
  authStore
    .login({
      email: data.value.email,
      password: data.value.password,
    })
    .then(onLoginSuccess, onLoginFail);
};
</script>

<template>
  <div>
    <ModalWrapper header="Войти">
      <q-form class="fit q-mb-sm form" @keydown.enter="handleLogin">
        <q-input
          v-bind="getErrorAttrs('email')"
          v-model="data.email"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Почта*"
          borderless
          @blur="handleBlur('email')" />

        <q-input
          v-bind="getErrorAttrs('password')"
          v-model="data.password"
          outlined
          class="fit q-mb-sm"
          label="Пароль*"
          aria-autocomplete="current-password"
          :type="isPwd ? 'password' : 'text'"
          @blur="handleBlur('password')">
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </q-form>
      <div class="row no-wrap q-mt-lg">
        <q-btn label="Войти" :disable="!isValid" class="q-btn--form" color="primary" @click="handleLogin" />
        <q-btn
          label="Закрыть"
          :align="'right'"
          class="q-ml-sm q-btn--form"
          flat
          :ripple="false"
          color="grey-1"
          @click="closeModal()" />
      </div>
      <div class="q-mt-lg q-mb-xs">
        <q-btn
          label="Зарегистрироваться"
          class="q-btn--form full-width"
          flat
          :ripple="false"
          color="primary"
          @click="closeModal(), emit('showRegistrationModal')" />
      </div>
      <div class="q-mt-xs">
        <q-btn
          label="Восстановить пароль"
          class="q-btn--form full-width"
          flat
          :ripple="false"
          color="primary"
          @click="closeModal(), emit('showForgotPasswordModal')" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

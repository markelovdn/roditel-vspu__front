<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { repeatPasswordValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useAuthStore } from "@/stores/authStore";

import { TResetPasswordPayload } from "./types";

const emit = defineEmits(["close"]);
const router = useRouter();
const route = useRoute();
const data = ref<TResetPasswordPayload>({
  password: "",
  passwordConfirm: "",
  resetToken: route.params.resetToken as unknown as string,
});

const authStore = useAuthStore();
const isPwd = ref(true);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TResetPasswordPayload>(data, emit, {
  password: { requiredValidator },
  passwordConfirm: { repeatPasswordValidator: repeatPasswordValidator(computed(() => data.value.password)) },
  resetToken: { requiredValidator },
});

const handleResetPassword = () => {
  authStore
    .resetPassword({ password: data.value.password, resetToken: data.value.resetToken })
    .then(() => router.push({ name: "Main" }));
};
</script>

<template>
  <div class="main-container">
    <div class="password-reset__wrapper absolute-center">
      <div class="header">
        <h4>Сбросить пароль</h4>
      </div>
      <q-form class="fit q-sm form">
        <q-input
          v-bind="getErrorAttrs('password')"
          v-model="data.password"
          outlined
          class="fit q-mb-sm"
          label="Новый пароль*"
          aria-autocomplete="new-password"
          :type="isPwd ? 'password' : 'text'"
          @blur="handleBlur('password')">
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-input
          v-model="data.passwordConfirm"
          outlined
          class="fit q-mb-sm"
          label="Подтвердите пароль*"
          v-bind="getErrorAttrs('passwordConfirm')"
          aria-autocomplete="new-password"
          :type="isPwd ? 'password' : 'text'"
          @blur="handleBlur('passwordConfirm')">
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div class="fit q-mb-sm footer">
          <q-btn
            label="Отправить"
            :disable="!isValid"
            class="fit q-btn--form q-mt-md"
            size="lg"
            color="primary"
            @click="handleResetPassword" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.password-reset__wrapper {
  width: 300px;

  & .header {
    margin-bottom: 24px !important;
  }
}
</style>

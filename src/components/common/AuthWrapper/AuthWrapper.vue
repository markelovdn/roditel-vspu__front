<script setup lang="ts">
import { inject, ref } from "vue";

import ForgotPassword from "@/components/modals/ForgotPasswordModal/ForgotPassword.vue";
import LoginModal from "@/components/modals/LoginModal/LoginModal.vue";
import RegistrationModal from "@/components/modals/RegistrationModal/RegistrationModal.vue";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";
const emit = defineEmits(["close"]);

const authModal = inject(AuthModalInjectionKey, {
  isForgotPasswordModalShowing: ref(false),
  isLoginModalShowing: ref(false),
  isRegistrationModalShowing: ref(false),
} as AuthModalProviderData);

const close = () => {
  emit("close");
};
</script>

<template>
  <div>
    <LoginModal
      v-if="authModal.isLoginModalShowing.value"
      @close="authModal.isLoginModalShowing.value = false"
      @close-common-modal="close"
      @show-registration-modal="authModal.showRegistrationModal"
      @show-forgot-password-modal="authModal.showForgotPasswordModal" />
    <ForgotPassword
      v-if="authModal.isForgotPasswordModalShowing.value"
      @close="authModal.isForgotPasswordModalShowing.value = false"
      @close-common-modal="close" />
    <RegistrationModal
      v-if="authModal.isRegistrationModalShowing.value"
      @close="authModal.isRegistrationModalShowing.value = false"
      @close-common-modal="close" />
  </div>
</template>

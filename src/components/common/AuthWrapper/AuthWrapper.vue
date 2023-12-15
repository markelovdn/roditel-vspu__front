<script setup lang="ts">
import { ref } from "vue";

import ForgotPassword from "@/components/modals/ForgotPasswordModal/ForgotPassword.vue";
import LoginModal from "@/components/modals/LoginModal/LoginModal.vue";
import RegistrationModal from "@/components/modals/RegistrationModal/RegistrationModal.vue";

const emit = defineEmits(["close"]);

const showLoginModal = ref(true);
const showRegistrationModal = ref(false);
const showForgotPasswordModal = ref(false);

const close = () => {
  emit("close");
};
</script>

<template>
  <div>
    <LoginModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @close-common-modal="close"
      @show-registration-modal="showRegistrationModal = true"
      @show-forgot-password-modal="showForgotPasswordModal = true" />
    <ForgotPassword
      v-if="showForgotPasswordModal"
      @close="showForgotPasswordModal = false"
      @close-common-modal="close" />
    <RegistrationModal
      v-if="showRegistrationModal"
      @close="showRegistrationModal = false"
      @close-common-modal="close" />
  </div>
</template>

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
  showLoginModal.value = false;
  emit("close");
};
</script>

<template>
  <div>
    <LoginModal
      v-if="showLoginModal"
      @close="close"
      @show-registration-modal="showRegistrationModal = true"
      @show-forgot-password-modal="showForgotPasswordModal = true"></LoginModal>
    <ForgotPassword v-if="showForgotPasswordModal" @close="showForgotPasswordModal = false"></ForgotPassword>
    <RegistrationModal v-if="showRegistrationModal" @close="showRegistrationModal = false"></RegistrationModal>
  </div>
</template>

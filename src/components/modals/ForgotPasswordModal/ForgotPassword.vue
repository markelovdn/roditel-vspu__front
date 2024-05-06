<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useModal } from "@/hooks/useModal";
import { emailValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useAuthStore } from "@/stores/authStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { TForgotPasswordPayload } from "./types";

const props = defineProps<{ email?: string }>();

const emit = defineEmits(["close", "close-common-modal"]);
const router = useRouter();

const data = ref<TForgotPasswordPayload>({
  email: "",
});

const { closeModal } = useModal(emit, data);
const authStore = useAuthStore();

const onForgotSuccess = () => {
  closeModal({ force: true });
  router.push({ name: "Main" });
};

const closeCommonModal = () => {
  closeModal({ force: true });
  emit("close-common-modal");
};

const { handleBlur, getErrorAttrs, isValid } = useValidation<TForgotPasswordPayload>(data, emit, {
  email: {
    requiredValidator,
    emailValidator,
  },
});

const handleForgotPassword = () => {
  authStore.forgotPassword({ email: data.value.email }).then(onForgotSuccess);
};

onMounted(() => {
  if (props.email) {
    data.value.email = props.email;
  }
});
</script>

<template>
  <ModalWrapper header="Сброс пароля">
    <q-form class="fit q-mb-sm form" @keydown.enter="handleForgotPassword">
      <q-input
        v-bind="getErrorAttrs('email')"
        v-model="data.email"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Почта*"
        borderless
        @blur="handleBlur('email')" />
    </q-form>
    <div class="row no-wrap q-mt-lg q-mb-mb">
      <q-btn label="Отправить" :disable="!isValid" class="q-btn--form" color="primary" @click="handleForgotPassword" />
      <q-btn label="Закрыть" class="q-btn--form" flat :ripple="false" color="grey-1" @click="closeCommonModal()" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
// .footer {
//   margin-top: 32px;
// }
</style>

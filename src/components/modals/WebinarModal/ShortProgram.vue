<script setup lang="ts">
import { inject, ref } from "vue";

import AuthWrapper from "@/components/common/AuthWrapper/AuthWrapper.vue";
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/stores/authStore";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close"]);

defineProps<{
  webinar: TWebinarCardData;
}>();

const { closeModal } = useModal(emit);
const { user } = useAuthStore();
const { webinarRegistration } = inject(AuthModalInjectionKey, {} as AuthModalProviderData);

const showLoginModal = ref(false);
</script>

<template>
  <ModalWrapper close-button-header @close="closeModal">
    <div class="q-pb-lg">
      <span class="header-title text-uppercase text-primary">{{ webinar.title }}</span>
    </div>
    <div class="q-mb-lg line"></div>
    <div class="q-pb-lg">
      <span class="question-title text-uppercase">Вопросы к обсуждению:</span>
    </div>
    <div v-for="(question, index) in webinar.questions" :key="question.questionText">
      <div class="text-question q-pb-md">{{ index + 1 }}. {{ question.questionText }}</div>
    </div>

    <div class="fit q-pt-lg footer">
      <q-btn
        label="Принять участие"
        class="q-btn--form"
        color="primary"
        @click="webinarRegistration(webinar.id, user?.id || 1, emit)" />
    </div>
  </ModalWrapper>
  <AuthWrapper v-if="showLoginModal" @close="showLoginModal = false" />
</template>

<style lang="scss" scoped>
.header-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0;
  text-align: left;
}

.question-title {
  color: $Text-color;
  line-height: 19px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
}

.text-question {
  color: $Text-color;
  line-height: 18px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
}

.line {
  border-bottom: 0.5px solid $grey-1;
}
</style>

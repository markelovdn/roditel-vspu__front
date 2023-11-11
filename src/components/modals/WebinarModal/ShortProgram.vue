<script setup lang="ts">
import { TWebinarCardData } from "@/components/common/Home/WebinarCard/types";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/stores/authStore";

import { useWebinarsStore } from "../../../stores/webinarsStore";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close"]);

const props = defineProps<{
  webinar: TWebinarCardData;
}>();

const { closeModal } = useModal(emit);

const webinarStore = useWebinarsStore();
const { user } = useAuthStore();
const webinarRegistration = () => {
  webinarStore.registrationPartisipant(props.webinar.id, user?.id || 1);
  closeModal();
};
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
      <q-btn label="Принять участие" class="q-btn--form" color="primary" @click="webinarRegistration()" />
    </div>
  </ModalWrapper>
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

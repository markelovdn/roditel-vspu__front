<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";

import { TUser } from "@/api/Auth/types";
import { TConsultation, TMessage } from "@/api/Consultations/types";
import ReviewGrade from "@/components/common/Home/ReviewGrade/ReviewGrade.vue";
import ConsultantFeedBack from "@/components/modals/ConsultantFeedback/ConsultantFeedBack.vue";

import { useAuthStore } from "../../stores/authStore";
import ChatItem from "./ChatItem.vue";

const props = defineProps<{ messages: TMessage[]; consultation: TConsultation }>();

const chatWrapper = ref();
const isScrollOnDown = ref(false);
const showFeedbackModal = ref(false);
const quality = ref(0);
const { user } = useAuthStore();

const handleScroll = () => {
  const div = chatWrapper.value;
  isScrollOnDown.value =
    Math.ceil(div.scrollHeight - div.scrollTop) === div.clientHeight ||
    Math.floor(div.scrollHeight - div.scrollTop) === div.clientHeight;
};

const feedbackModalClose = () => {
  showFeedbackModal.value = false;
  quality.value = 0;
};

const scrollToBottom = () => chatWrapper.value.scrollTo(0, chatWrapper.value.scrollHeight);
const findUser = (id: number) => (props.consultation.users.find((user) => user.id === id) as TUser) || user;

onMounted(() => {
  scrollToBottom();
});

onUpdated(() => {
  watch(
    props.messages,
    () => {
      if (isScrollOnDown.value) setTimeout(() => scrollToBottom());
    },
    { deep: true },
  );
});
</script>

<template>
  <div ref="chatWrapper" class="chat-wrapper scroll" @scroll="handleScroll">
    <ChatItem
      v-for="(item, i) in messages"
      :key="i"
      :item="consultation"
      :message="item"
      :user="findUser(item.userId)" />
    <div v-if="consultation.closed && user?.role.code !== 'consultant'" @click="showFeedbackModal = true">
      <ReviewGrade v-model="quality" :max="5" />
    </div>
    <ConsultantFeedBack
      v-if="showFeedbackModal"
      :consultation-id="consultation.id"
      :quality="quality"
      @close="feedbackModalClose" />
  </div>
</template>

<style lang="scss" scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  overflow-y: scroll;
  height: 500px;
}
</style>

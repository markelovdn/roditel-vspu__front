<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";

import { TConsultation } from "@/api/Consultations/types";
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import CreateConsultationModal from "@/components/modals/ConsultationModal/CreateConsultationModal.vue";
import { useConsultationsStore } from "@/stores/consultationsStore";

const consultationsStore = useConsultationsStore();
const idActiveChat = ref(0);
const isShowCreateConsultationModal = ref(false);

const setIdActiveChat = (id: number) => {
  consultationsStore.connectChannel(id);
  idActiveChat.value = id;
};

const sendMessage = (message: string) => {
  consultationsStore.sendMessage(message, idActiveChat.value);
};
const idActiveChatMessages = computed(
  () => consultationsStore.consultations.find((item) => item.id === idActiveChat.value)?.messages || [],
);

const idActiveChatConsultation = computed(
  () =>
    consultationsStore.consultations[
      consultationsStore.consultations.findIndex((item) => item.id === idActiveChat.value)
    ],
);

onBeforeMount(() => {
  // useRequestPayload(queryParams, consultationsStore.requestConsultations, {});
  //TODO: нужно динамически передавать id консультации не уверен что это надо делать в этом компоненте
  consultationsStore.requestConsultations({}).then((data: TConsultation[]) => {
    idActiveChat.value = data[0].id;
    consultationsStore.connectChannel(data[0].id);
  });
});
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        <h5>Вопросы</h5>
      </div>
      <div class="question__box">
        <q-btn outline style="color: #f7b70b" class="q-btn--form q-ml-sm">
          <span class="text-primary question__btn-label" @click="isShowCreateConsultationModal = true">
            Задать вопрос
          </span>
        </q-btn>
      </div>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar">
        <ChatSideBarWrapper
          :active-chat="idActiveChat"
          :consultations="consultationsStore.consultations"
          @set-change-chat="setIdActiveChat" />
      </div>
      <div class="question__content">
        <ChatWrapper
          v-if="idActiveChatConsultation"
          :messages="idActiveChatMessages"
          :consultation="idActiveChatConsultation" />
        <div v-else><h2>загрузка</h2></div>
        <MessageInput @send-message="sendMessage" />
      </div>
    </div>
    <CreateConsultationModal
      v-if="isShowCreateConsultationModal"
      @close="isShowCreateConsultationModal = false"></CreateConsultationModal>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 10px 10px 10px 10px;
  background-color: #e4ebf5;

  &__wrapper {
    display: flex;
    gap: 2px;
    height: 592px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__box {
    display: flex;
    align-items: center;

    &:first-child {
      gap: 35px;
    }
  }

  &__sidebar {
    display: flex;
    background-color: #ffffff;
    flex-basis: 36%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 64%;
    height: 100%;
  }
  &__btn-label {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
}
</style>

<style lang="scss">
.q-field__control,
.q-field__marginal {
  height: 46px;
}
</style>

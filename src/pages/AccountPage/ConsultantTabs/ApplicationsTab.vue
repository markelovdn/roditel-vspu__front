<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";

import { TConsultation, TGetConsultationsFilter } from "@/api/Consultations/types";
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useConsultationsStore } from "@/stores/consultationsStore";

const consultationsStore = useConsultationsStore();
const queryParams = ref<TGetConsultationsFilter>({});
const idActiveChat = ref(0);
useRequestPayload(queryParams, consultationsStore.requestConsultations, {});

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
  //TODO: нужно динамически передавать id консультации не уверен что это надо делать в этом компоненте
  consultationsStore.requestConsultations({}).then((data: TConsultation[]) => {
    idActiveChat.value = data[0].id;
    consultationsStore.connectChannel(data[0].id);
  });
});
const search = ref("");
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        <h5>Заявки</h5>
        <q-input v-model="search" outlined bottom-slots class="q-pb-none">
          <template #append>
            <q-icon v-if="search !== ''" name="close" class="cursor-pointer" />
            <q-icon name="search" style="cursor: pointer" />
          </template>
        </q-input>
      </div>

      <div class="question__box">
        <q-btn label="Актуальные" class="q-btn--form" color="primary" />
        <q-btn label="Выполненные" class="q-btn--form" flat :ripple="false" color="grey-1" />
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
}
</style>

<style lang="scss">
.q-field__control,
.q-field__marginal {
  height: 46px;
}
</style>

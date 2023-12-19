<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { TConsultation, TGetConsultationsFilter } from "@/api/Consultations/types";
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useConsultationsStore } from "@/stores/consultationsStore";
const route = useRoute();
const consultationsStore = useConsultationsStore();
const queryParams = ref<TGetConsultationsFilter>({ actual: "yes" });
const idActiveChat = ref(0);
const actual = ref<"yes" | "no">((route.query.actual as "yes" | "no") || "yes");

const setIdActiveChat = (id: number) => {
  consultationsStore.connectChannel(id);
  idActiveChat.value = id;
};

const sendMessage = (message: string) => {
  consultationsStore.sendMessage(message, idActiveChat.value);
};
const setActual = (value: "yes" | "no") => (queryParams.value.actual = value);

const idActiveChatMessages = computed(
  () => consultationsStore.consultations.find((item) => item.id === idActiveChat.value)?.messages || [],
);

const idActiveChatConsultation = computed(
  () =>
    consultationsStore.consultations[
      consultationsStore.consultations.findIndex((item) => item.id === idActiveChat.value)
    ],
);

const setFirstActiveChat = (data: TConsultation[]) => {
  idActiveChat.value = data[0].id;
  consultationsStore.connectChannel(data[0].id);
};

onBeforeMount(() => {
  consultationsStore.requestConsultations({}).then((data: TConsultation[]) => {
    idActiveChat.value = data[0].id;
    consultationsStore.connectChannel(data[0].id);
  });

  useRequestPayload(
    queryParams,
    async (filters) => {
      await consultationsStore.requestConsultations(filters);
      setFirstActiveChat(consultationsStore.consultations);
    },
    {},
  );
});
const search = ref("");
let searchTimeoutId: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => {
    queryParams.value.searchField = search.value;
  }, 300);
});
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        <h5>Заявки</h5>
        <q-input v-model="search" outlined bottom-slots class="q-pb-none">
          <template #append>
            <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
            <q-icon name="search" style="cursor: pointer" />
          </template>
        </q-input>
      </div>

      <div class="question__box">
        <q-btn-toggle
          v-model="actual"
          spread
          no-caps
          toggle-color="primary"
          text-color="primary"
          :options="[
            { label: 'Актуальные', value: 'yes' },
            { label: 'Прошедшие', value: 'no' },
          ]"
          @update:model-value="setActual" />
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
        <div v-else><h2>Ничего не нашлось</h2></div>
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

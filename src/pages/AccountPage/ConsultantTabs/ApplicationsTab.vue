<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { TConsultation, TGetConsultationsFilter } from "@/api/Consultations/types";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import SideBarItem from "@/components/Chat/SideBarItem.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useConsultationsStore } from "@/stores/consultationsStore";

const route = useRoute();
const consultationsStore = useConsultationsStore();
const queryParams = ref<TGetConsultationsFilter>({ actual: "yes" });
const idActiveChat = ref(0);
const actual = ref<"yes" | "no">((route.query.actual as "yes" | "no") || "yes");

const isActual = computed(() => actual.value === "yes");

const search = ref("");
const debouncedSearch = useDebounce(search, 300);

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

const closeConsultation = (id: number) => {
  consultationsStore.closeConsultation(id);
};

useRequestPayload(
  queryParams,
  async (filters) => {
    await consultationsStore.requestConsultations(filters).then((data: TConsultation[]) => {
      idActiveChat.value = data[0].id;
      consultationsStore.connectChannel(data[0].id);
    });
    setFirstActiveChat(consultationsStore.consultations);
  },
  {},
);

watch(debouncedSearch, () => {
  queryParams.value.searchField = debouncedSearch.value;
});
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        <h5>Заявки</h5>
        <q-input v-model="search" label="Поиск" outlined bottom-slots class="q-pb-none">
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
        <SideBarItem
          v-for="(item, index) in consultationsStore.consultations"
          :key="index"
          :item="item"
          :is-active="idActiveChat === item.id"
          @click="setIdActiveChat(item.id)" />
      </div>
      <div class="question__content">
        <ChatWrapper
          v-if="idActiveChatConsultation"
          :messages="idActiveChatMessages"
          :consultation="idActiveChatConsultation" />
        <div v-else><h2>Ничего не нашлось</h2></div>
        <MessageInput
          v-if="isActual"
          :is-show-closed-button="true"
          @close-consultation="closeConsultation(idActiveChat)"
          @send-message="sendMessage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 10px 10px;
  background-color: #e4ebf5;

  &__wrapper {
    display: grid;
    // gap: 2px;
    // height: 592px;
    grid-template-columns: 1fr 3fr;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 15px 35px;
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
    flex-direction: column;
    overflow-y: auto;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
  }
}
</style>

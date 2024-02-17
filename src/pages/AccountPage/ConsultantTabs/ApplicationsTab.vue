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
const isChatSidebar = ref(false);

const isActual = computed(() => actual.value === "yes");

const search = ref("");
const debouncedSearch = useDebounce(search, 300);

const handleChatMobile = () => {
  isChatSidebar.value = !isChatSidebar.value;
};

const setIdActiveChat = (id: number) => {
  consultationsStore.connectChannel(id);
  idActiveChat.value = id;
  isChatSidebar.value = false;
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
      <div class="flex justify-between justify-between question__box">
        <h5>Заявки</h5>
        <q-input v-model="search" debounce="500" class="max-width" outlined placeholder="Поиск">
          <template #append>
            <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
            <q-icon name="search" style="cursor: pointer" />
          </template>
        </q-input>
      </div>

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

      <q-btn outline class="q-ml-sm q-mr-sm question__btn-chat" @click="handleChatMobile">
        <span class="text-primary question__btn-label">
          {{ isChatSidebar ? "Скрыть другие чаты" : "Показать другие чаты" }}
        </span>
      </q-btn>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar" :class="{ [`question__sidebar--active`]: isChatSidebar }">
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
    display: flex;
    height: 592px;

    @media (max-width: 576px) {
      position: relative;
    }
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

    @media (max-width: $mobile-max-width) {
      flex-direction: column;
      height: 100%;
      gap: 35px;
    }
  }

  &__box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    @media (max-width: $mobile-max-width) {
      flex-wrap: wrap;
    }

    &:first-child {
      gap: 35px;
    }
  }

  &__sidebar {
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
    overflow-y: auto;

    @media (max-width: 576px) {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      transform: translateX(-100%);
      transition: transform 0.5s;
    }

    &--active {
      @media (max-width: 576px) {
        transform: translateX(0%);
        transition: transform 0.5s;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 64%;
    height: 100%;

    @media (max-width: 576px) {
      flex-basis: 100%;
      width: 100%;
    }
  }
  &__btn-label {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }

  &__btn-chat {
    display: none;

    @media (max-width: 576px) {
      display: flex;
    }
  }
}

.question__column {
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 20px;
    button {
      margin: 0;
    }
  }
}
</style>

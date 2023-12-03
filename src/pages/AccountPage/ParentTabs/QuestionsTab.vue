<script setup lang="ts">
import { ref } from "vue";

import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import ConsultantFeedBack from "@/components/modals/ConsultantFeedback/ConsultantFeedBack.vue";

const search = ref("");
const showFeedbackModal = ref(false);
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        <h5>Заявки</h5>
        <q-input v-model="search" outlined bottom-slots class="q-pb-none">
          <template #append>
            <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="question__box">
        <q-btn label="Актуальные" class="q-btn--form" color="primary" />
        <q-btn label="Выполненные" class="q-btn--form" flat :ripple="false" color="grey-1" />
      </div>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar"><ChatSideBarWrapper /></div>
      <div class="question__content">
        <ChatWrapper />
        <MessageInput />
      </div>
    </div>

    <ConsultantFeedBack v-if="showFeedbackModal" @close="showFeedbackModal = false" />
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

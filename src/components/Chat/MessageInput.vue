<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{
  (e: "send-message", message: string): void;
  (e: "close-consultation"): void;
}>();
defineProps<{ isShowClosedButton?: boolean }>();
const message = ref<string>("");

const sendMessage = () => {
  emits("send-message", message.value);
  message.value = "";
};
const closeConsultation = () => {
  confirm("Вы уверены, что хотите закрыть консультацию?") && emits("close-consultation");
};
</script>

<template>
  <div class="message">
    <q-input
      v-model="message"
      placeholder="Введите ответ на сообщение"
      class="message__input"
      bg-color="white"
      outlined
      autogrow
      @keydown.enter.prevent="sendMessage" />
    <q-btn color="primary" class="message__btn" @click="sendMessage">Отправить</q-btn>
    <q-btn v-if="isShowClosedButton" color="red" class="message__btn" @click="closeConsultation">Закрыть</q-btn>
  </div>
</template>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 20px 18px 23px;
  background-color: #fff;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }

  &__input {
    flex-grow: 1;
    color: $grey-2;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    background: #fff;
  }
  &__btn {
  }
}
</style>

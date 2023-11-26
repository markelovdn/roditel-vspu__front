<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{ (e: "send-message", message: string): void }>();
const message = ref<string>("");

const sendMessage = () => {
  emits("send-message", message.value);
};
</script>

<template>
  <div class="message">
    <q-input
      v-model="message"
      placeholder="Введите ответ на сообщение"
      class="message__input"
      bg-color="white"
      filled />
    <q-btn color="primary" class="message__btn" @click="sendMessage">Отправить</q-btn>
  </div>
</template>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 20px 18px 23px;
  background-color: #fff;

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

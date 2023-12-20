<script setup lang="ts">
import { TUser } from "@/api/Auth/types";
import { TConsultation, TMessage } from "@/api/Consultations/types";

import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();

const props = defineProps<{
  item: TConsultation;
  message: TMessage;
  user: TUser;
}>();

const isMyMessage = authStore.user?.id === props.user.id;
</script>

<template>
  <div class="chat-item" :class="isMyMessage ? 'chat-item--consultant' : 'chat-item--customer'">
    <div class="chat-item__wrapper">
      <div class="chat-item__info">
        <h3 class="chat-item__name">{{ user.fullName }}</h3>
        <h4 class="chat-item__spec">Кат. {{ item.specialization.title }}</h4>
      </div>
      <div class="chat-item__content">{{ message.text }}</div>
      <div class="chat-item__time">{{ message.createdAt }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-item {
  display: flex;
  &__wrapper {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    max-width: 75%;
    padding: 10px;
    gap: 15px;
  }
  &--consultant {
    justify-content: flex-end;
  }
  &--consultant > &__wrapper {
    border-radius: 25px 25px 0px 25px;
  }
  &--customer > &__wrapper {
    border-radius: 25px 25px 25px 0px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__name {
    margin: 0;
    color: $Blue-lighter;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__spec {
    color: $grey-2;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__content {
    color: $Text-color;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__time {
    text-align: right;
    color: #b5bfd6;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }
}
</style>

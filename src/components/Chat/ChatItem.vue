<script setup lang="ts">
import { ref } from "vue";

import { TUser } from "@/api/Auth/types";
import { TConsultation, TMessage } from "@/api/Consultations/types";

import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();

const props = defineProps<{
  item: TConsultation;
  message: TMessage;
}>();

const userCreator = ref<TUser>({} as TUser);
const interlocutor = ref<TUser>({} as TUser);

const setUserAffiliation = (users: TUser[]) => {
  let isUserCreator = false;
  let isInterlocutor = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === authStore.user?.id) {
      isUserCreator = true;
      userCreator.value = users[i];
    } else {
      isInterlocutor = true;
      interlocutor.value = users[i];
    }

    if (isUserCreator && isInterlocutor) return;
  }
};
const isMyMessage = authStore.user?.id === props.message.userId;

setUserAffiliation(props.item.users);
</script>

<template>
  <div class="chat-item">
    <div class="chat-item__wrapper">
      <div
        :class="isMyMessage ? 'chat-item__box chat-item__box--customer' : 'chat-item__box chat-item__box--consultant'"
        class="chat-item__box">
        <div class="chat-item__info">
          <h3 class="chat-item__name">{{ isMyMessage ? userCreator.fullName : interlocutor.fullName }}</h3>
          <h4 class="chat-item__spec">Кат. Дошкольники</h4>
        </div>
        <div class="chat-item__content">{{ message.text }}</div>
      </div>
      <div class="chat-item__time">{{ message.createdAt }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-item {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 25px 33px 34px;
    background-color: #ffffff;

    &--consultant {
      border-radius: 25px 0px 25px 25px;
    }
    &--customer {
      border-top-right-radius: 25px;
    }
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

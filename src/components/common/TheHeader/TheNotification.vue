<script setup lang="ts">
import { computedEager } from "@vueuse/core";

import IconNotificationsBell from "@/components/icons/IconNotificationsBell.vue";
import { useAuthStore } from "@/stores/authStore";

import { notificationRoutes } from "./data";

const authStore = useAuthStore();

const isConsultant = computedEager(() => {
  return authStore.getUserInfo?.role.code === "consultant";
});

const strategy = isConsultant.value ? notificationRoutes.consultant : notificationRoutes.parent;

defineProps<{
  count: number;
}>();
</script>

<template>
  <div class="notify">
    <IconNotificationsBell :count="count" />
    <div v-if="!!count" class="notify__block">
      <RouterLink :to="`/${strategy.questionnaire.link}`" class="notify__link">
        {{ strategy.questionnaire.text }}
      </RouterLink>
      <RouterLink :to="`/${strategy.message.link}`" class="notify__link">{{ strategy.message.text }}</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notify {
  position: relative;

  @media screen and (max-width: $mobile-max-width) {
    display: flex;
    justify-content: end;
    padding-right: 20px;
  }

  &__block {
    position: absolute;
    padding: 10px;
    display: none;

    flex-direction: column;
    gap: 5px;

    right: 0;

    min-width: 125px;
    background-color: white;
    border-radius: 5px;

    z-index: 9;
  }

  &:hover {
    .notify__block {
      display: flex;
    }
  }

  &__link {
    white-space: nowrap;
  }
}
</style>

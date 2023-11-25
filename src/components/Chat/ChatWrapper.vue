<script setup lang="ts">
// import { ref } from "vue";

import { TConsultation, TMessage } from "@/api/Consultations/types";

import ChatItem from "./ChatItem.vue";

defineProps<{ messages: TMessage[]; consultation: TConsultation }>();
</script>

<template>
  <div class="chat-wrapper">
    <ChatItem v-for="(item, i) in messages" :key="i" :item="consultation" :message="item" />
  </div>
</template>

<style lang="scss" scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  overflow-y: auto;
}
</style>

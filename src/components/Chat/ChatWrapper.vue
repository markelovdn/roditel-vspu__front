<script setup lang="ts">
// import { ref } from "vue";

import { useConsultationsStore } from "@/stores/consultationsStore";

import ChatItem from "./ChatItem.vue";
const consultationsStore = useConsultationsStore();
</script>

<template>
  <div class="chat-wrapper">
    <ChatItem
      v-for="(item, i) in consultationsStore.consultations.messages"
      :key="i"
      :item="consultationsStore.consultations"
      :message="item" />
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

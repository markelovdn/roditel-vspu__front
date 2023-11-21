<script setup lang="ts">
import ChatItem from "./ChatItem.vue";
</script>

<template>
  <div class="chat-wrapper">
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
    <ChatItem />
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

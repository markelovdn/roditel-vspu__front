<script setup lang="ts">
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
</script>

<template>
  <div class="question">
    <div class="question__sidebar"><ChatSideBarWrapper /></div>
    <div class="question__content">
      <ChatWrapper />
      <MessageInput />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  gap: 2px;
  background-color: #e4ebf5;
  height: 700px;
  &__sidebar {
    display: flex;
    background-color: #ffffff;
    flex-basis: 35%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 65%;
  }
}
</style>

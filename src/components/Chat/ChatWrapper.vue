<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";

import { TUser } from "@/api/Auth/types";
import { TConsultation, TMessage } from "@/api/Consultations/types";

import ChatItem from "./ChatItem.vue";

const props = defineProps<{ messages: TMessage[]; consultation: TConsultation }>();

const chatWrapper = ref();
const isScrollOnDown = ref(false);

const handleScroll = () => {
  const div = chatWrapper.value;
  isScrollOnDown.value =
    Math.ceil(div.scrollHeight - div.scrollTop) === div.clientHeight ||
    Math.floor(div.scrollHeight - div.scrollTop) === div.clientHeight;
};

const scrollToBottom = () => chatWrapper.value.scrollTo(0, chatWrapper.value.scrollHeight);
const findUser = (id: number) => props.consultation.users.find((user) => user.id === id) as TUser;

onMounted(() => {
  scrollToBottom();
});

onUpdated(() => {
  watch(
    props.messages,
    () => {
      if (isScrollOnDown.value) setTimeout(() => scrollToBottom());
    },
    { deep: true },
  );
});
</script>

<template>
  <div ref="chatWrapper" class="chat-wrapper scroll" @scroll="handleScroll">
    <ChatItem
      v-for="(item, i) in messages"
      :key="i"
      :item="consultation"
      :message="item"
      :user="findUser(item.userId)" />
    <div>Оценить {{ consultation.closed }}</div>
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

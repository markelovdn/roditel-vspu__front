<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";

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

const scrollToBottom = () => {
  chatWrapper.value.scrollTo(0, chatWrapper.value.scrollHeight);
};

onMounted(() => scrollToBottom());

onUpdated(() => {
  watch(
    props.messages,
    () => {
      if (isScrollOnDown.value) setTimeout(() => scrollToBottom()); //Не понял как дождаться увелечения размера дива. Поэтому кидаю его в конец очереди таким образом
    },
    { deep: true },
  );
});
</script>

<template>
  <div ref="chatWrapper" class="chat-wrapper scroll" @scroll="handleScroll">
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

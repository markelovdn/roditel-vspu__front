<script setup lang="ts">
import Echo from "laravel-echo";
import io from "socket.io-client";
import { onBeforeMount, ref } from "vue";

import axios from "@/common/axios";
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";

const messages = ref([]);
const newMessage = ref("");

const socket = io("http://localhost:6001", {
  query: { token: localStorage.getItem("token") },
});

window.io = io;

window.Echo = new Echo({
  broadcaster: "socket.io",
  host: window.location.hostname + ":6001",
  transports: ["websocket"],
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

// Authenticate the user
window.Echo.channel("consultation." + 93).listen("ConsultationEvent", (event) => {
  console.log(event);
  messages.value.push(event.message);
});

const sendMessage = () => {
  axios.post("/messages?XDEBUG_SESSION=VSCODE", { message: newMessage.value });
  // socket.emit("sendMessage", newMessage.value);
  console.log(newMessage.value);
  newMessage.value = "";
};

onBeforeMount(() => {
  console.log("OK");
  socket.on("newMessage", (message) => {
    messages.value = [...messages.value, message];
  });
});
const search = ref("");
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__box">
        {{ messages }}
        <h5>Заявки</h5>
        <q-input v-model="newMessage" outlined bottom-slots class="q-pb-none">
          <template #append>
            <q-icon v-if="search !== ''" name="close" class="cursor-pointer" />
            <q-icon name="search" style="cursor: pointer" @click="sendMessage" />
          </template>
        </q-input>
      </div>

      <div class="question__box">
        <q-btn label="Актуальные" class="q-btn--form" color="primary" />
        <q-btn label="Выполненные" class="q-btn--form" flat :ripple="false" color="grey-1" />
      </div>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar"><ChatSideBarWrapper /></div>
      <div class="question__content">
        <ChatWrapper />
        <MessageInput />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 10px 10px 10px 10px;
  background-color: #e4ebf5;

  &__wrapper {
    display: flex;
    gap: 2px;
    height: 592px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__box {
    display: flex;
    align-items: center;

    &:first-child {
      gap: 35px;
    }
  }

  &__sidebar {
    display: flex;
    background-color: #ffffff;
    flex-basis: 36%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 64%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.q-field__control,
.q-field__marginal {
  height: 46px;
}
</style>

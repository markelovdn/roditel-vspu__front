import { defineStore } from "pinia";
import { ref } from "vue";

import { socket } from "@/common/socket";

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref([]);

  function bindEvents() {
    // sync the list of items upon connection
    socket.on("connect", () => {
      socket.emit("item:list", (res) => {
        messages.value = res.data;
      });
    });

    // update the store when an item was created
    socket.on("item:created", (item) => {
      messages.value.push(item);
    });
  }

  function createItem(label) {
    const item = {
      id: Date.now(), // temporary ID for v-for key
      label,
    };
    messages.value.push(item);

    socket.emit("item:create", { label }, (res) => {
      item.id = res.data;
    });
  }

  return {
    messages,
    bindEvents,
    createItem,
  };
});

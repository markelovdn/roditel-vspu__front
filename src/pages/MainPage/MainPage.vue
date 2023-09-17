<script setup lang="ts">
import LoginModal from "@/components/modals/LoginModal/LoginModal.vue";
import { ref } from "vue";


const showLoginModal = ref(false);
</script>

<template>
  
  <q-btn @click="showLoginModal = true">Вход</q-btn>
  
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false"></LoginModal>

  <p v-for="n in 15" :key="n">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae
    odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis
    voluptate?
  </p>
</template>

<style scoped></style>

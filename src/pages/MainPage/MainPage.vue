<script setup lang="ts">
import RegistrationModal from "@/components/modals/RegistrationModal/RegistrationModal.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <q-btn @click="showModal = true">show modal</q-btn>
  <RegistrationModal v-if="showModal" @close="showModal = false"></RegistrationModal>
  <p v-for="n in 15" :key="n">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae
    odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis
    voluptate?
  </p>
</template>

<style scoped></style>

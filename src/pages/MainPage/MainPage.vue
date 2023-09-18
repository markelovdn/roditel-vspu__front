<script setup lang="ts">
import { ref } from "vue";
import ShortProgramModal from '@/components/modals/VebinarModal/ShortProgramModal.vue'
const showProgramModal = ref(true);
</script>

<template>
<ShortProgramModal v-if="showProgramModal" @close="showProgramModal = !showProgramModal"></ShortProgramModal>
  <p v-for="n in 15" :key="n">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae
    odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis
    voluptate?
  </p>
</template>

<style scoped></style>

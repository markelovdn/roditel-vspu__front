<script setup lang="ts">
import { ref } from "vue";
import ShortProgramModal from "@/components/modals/WebinarModal/ShortProgram.vue";
const showProgramModal = ref(true);
</script>

<template>
  <ShortProgramModal v-if="showProgramModal" @close="showProgramModal = !showProgramModal"></ShortProgramModal>
</template>

<style scoped></style>

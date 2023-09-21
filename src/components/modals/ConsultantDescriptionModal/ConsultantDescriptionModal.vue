<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { useModal } from "@/hooks/useModal";

const props = defineProps<{
  consultant: Consultant
}>()
const emit = defineEmits(["close"]);

const { closeModal } = useModal(emit);


</script>

<template>
  <ModalWrapper closeButtonHeader @close="closeModal">
    {{ consultant.description }}
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

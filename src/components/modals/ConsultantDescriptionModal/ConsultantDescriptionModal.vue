<script setup lang="ts">
import type { Consultant } from "@/components/common/Home/ConsultantsCard/types";
import { useModal } from "@/hooks/useModal";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

defineProps<{
  consultant: Consultant;
}>();
const emit = defineEmits(["close"]);

const { closeModal } = useModal(emit);
</script>

<template>
  <ModalWrapper close-button-header @close="closeModal">
    {{ consultant.description }}
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

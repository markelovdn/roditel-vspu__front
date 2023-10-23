<script setup lang="ts">
import { ref } from "vue";

import { type TQuestionnairePayload } from "@/api/Questionnaires/types";
import { useModal } from "@/hooks/useModal";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import CreateForm from "./CreateForm.vue";

const emit = defineEmits(["close"]);

const data = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  answerBefore: "",
});

const { closeModal } = useModal(emit, data);

const isValid = ref(false);

//TODO: добавить тип нормальный вместо any
const handleValidChange = (eventPayload: any) => {
  isValid.value = eventPayload.isValid;
};
</script>

<template>
  <ModalWrapper header="Создать анкету" sub-header="Введите данные" @close="closeModal">
    <CreateForm v-model="data" @validation-change="handleValidChange" />
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

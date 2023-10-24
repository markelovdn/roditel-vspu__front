<script setup lang="ts">
import { ref } from "vue";

import { type TQuestionnaire } from "@/components/modals/QuestionnairesModal/types";
import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import AddQuestionForm from "./AddQuestionForm.vue";

const emit = defineEmits(["close"]);

const data = ref<TQuestionnaire>({
  title: "",
  description: "",
  answerBefore: "",
  questions: [
    {
      id: null,
      text: "",
      description: "",
      type: "text | single | many",
      options: [
        {
          id: null,
          text: "",
        },
      ],
    },
  ],
});

const { closeModal } = useModal(emit, data);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TQuestionnaire>(data, emit, {
  title: { requiredValidator },
  description: "",
  answerBefore: "",
  questions: [
    {
      id: null,
      text: "",
      description: "",
      type: "text | single | many",
      options: [
        {
          id: null,
          text: "",
        },
      ],
    },
  ],
});
</script>

<template>
  <ModalWrapper header="Создать анкету" sub-header="Введите данные" close-button-header @close="closeModal">
    <q-form class="fit q-mb-sm form">
      <q-input
        v-bind="getErrorAttrs('title')"
        v-model="data.title"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Название*"
        borderless
        color="primary"
        @blur="handleBlur('title')" />

      <q-input
        v-bind="getErrorAttrs('description')"
        v-model="data.description"
        type="textarea"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Описание"
        borderless
        color="primary"
        @blur="handleBlur('description')" />
    </q-form>

    <div class="row no-wrap q-mt-lg">
      <q-btn label="Добавить вопрос" :disable="!isValid" class="q-btn--form" color="primary"></q-btn>
    </div>

    <AddQuestionForm v-model="data"></AddQuestionForm>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

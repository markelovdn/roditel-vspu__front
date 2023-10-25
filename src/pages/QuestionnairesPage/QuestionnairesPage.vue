<script setup lang="ts">
import { ref } from "vue";

import { TQuestion, TQuestionnairePayload } from "@/pages/QuestionnairesPage/types";

import ManyChoiceQuestion from "./ManyChoiceQuestion.vue";
import SingleChoiceQuestion from "./SingleChoiceQuestion.vue";
import TextQuestion from "./TextQuestion.vue";

const data = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  answerBefore: "",
  questions: [
    {
      id: null,
      text: "",
      description: "",
      type: "",
      options: [
        {
          id: null,
          text: "",
        },
      ],
    },
  ],
});

const questions = ref<TQuestion>({
  id: null,
  text: "",
  description: "",
  type: "",
  options: [
    {
      id: null,
      text: "",
    },
  ],
});

const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];
</script>

<template>
  <div class="main-container">
    <h4>Анкета</h4>
    <q-form class="fit q-mb-sm form">
      <q-input
        v-model="data.title"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Название анкеты*"
        borderless
        color="primary" />

      <q-input
        v-model="data.description"
        type="textarea"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Описание анкеты"
        borderless
        color="primary" />
    </q-form>
    <h5>Вопросы</h5>
    {{ data.questions }}
    <div class="row no-wrap q-mt-lg">
      <q-btn label="Добавить вопрос" class="q-btn--form" color="primary"></q-btn>
      <q-btn label="Сохранить анкету" disable class="q-btn--form" color="primary"></q-btn>
    </div>

    <q-select
      v-model="questions.type"
      input-class="q-select--form"
      label="Тип вопроса*"
      :options="questionTypeSelect"
      :option-label="(item) => item.label"
      outlined
      class="fit q-mb-sm"
      emit-value />

    <ManyChoiceQuestion v-if="questions.type === 'many'" />
    <SingleChoiceQuestion v-if="questions.type === 'single'" />
    <TextQuestion v-if="questions.type === 'text'" />
  </div>
</template>

<style scoped></style>

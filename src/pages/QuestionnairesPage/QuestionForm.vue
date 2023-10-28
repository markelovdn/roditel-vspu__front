<script setup lang="ts">
import { defineProps, inject } from "vue";

import OptionForm from "./QuestionForm.vue";

const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];

const { SurveyData, delQuestion } = inject("SurveyData");

const props = defineProps<{
  questionIndex: number;
  question: [];
}>();
</script>

<template>
  <div>
    <div class="flex">
      <span>Вопрос {{ props.questionIndex + 1 }}</span>
      <q-btn size="xs" class="btn-delete" dense color="negative" @click="delQuestion(questionIndex)">
        Удалить вопрос
      </q-btn>
    </div>
    <q-select
      v-model="SurveyData.question.type"
      label="Тип вопроса*"
      :options="questionTypeSelect"
      map-options
      class="q-mb-sm"
      emit-value />

    <q-input v-model="SurveyData.question.text" class="q-mb-sm" label="Текст вопроса*" />
    <q-input v-model="SurveyData.question.description" autogrow class="q-mb-sm" label="Пояснения" />

    <!-- Ответы -->
    <OptionForm :question-index="questionIndex" />
  </div>
</template>

<style lang="scss" scoped>
.btn-delete {
  height: unset;
}
</style>

<script setup lang="ts">
import { defineProps, inject, ref } from "vue";

import { SurveyInjectionKey, TSurveyProviderData } from "@/injectionKeys";

import { TDefaultQuestion } from "./types";

// import OptionForm from "./QuestionForm.vue";

const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];

const { delQuestion } = inject(SurveyInjectionKey, {} as TSurveyProviderData);

const props = defineProps<{
  questionIndex: number;
  question: TDefaultQuestion;
}>();
// Второй вариант как можно менять значение, используя инжектор
// const questionModel = ref(surveyData.value.questions[props.questionIndex]);

//обновление данных через пропсы и vmodel
const emit = defineEmits(["update:question"]);
const questionModel = ref(props.question);
const updateQuestion = () => {
  emit("update:question", questionModel.value);
};
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
      v-model="questionModel.type"
      label="Тип вопроса*"
      map-options
      emit-value
      class="q-mb-sm"
      :options="questionTypeSelect"
      @update:model-value="updateQuestion()" />

    <q-input v-model="questionModel.text" class="q-mb-sm" label="Текст вопроса*" @update:model-value="updateQuestion" />
    <q-input
      v-model="questionModel.description"
      autogrow
      class="q-mb-sm"
      label="Пояснения"
      @update:model-value="updateQuestion" />

    <!-- Ответы -->
    <!-- <OptionForm :question-index="questionIndex" /> -->
  </div>
</template>

<style lang="scss" scoped>
.btn-delete {
  height: unset;
}
</style>

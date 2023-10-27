<script setup lang="ts">
import { inject, ref } from "vue";

import { SurveyDataKey } from "./keys";

const defaultOption = { text: "" };
const freeOption = { textFree: "" };
const textFree = ref(false);
const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];

const SurveyData = inject(SurveyDataKey, {
  title: "",
  description: "",
  questions: [],
});

const addQuestions = () => {
  SurveyData.questions.push({
    text: "",
    description: "",
    type: "",
    options: [],
  });
};

const delQuestion = (index: number) => {
  SurveyData.questions.splice(index, 1);
};

const addOptions = (index: number) => {
  SurveyData.questions[index].options.push({ ...defaultOption });
};

const delOption = (questionIndex: number, optionIndex: number) => {
  SurveyData.questions[questionIndex].options.splice(optionIndex, 1);
};

const addFreeOption = (index: number, optionIndex: number) => {
  const isTextFree = SurveyData.questions[index].options.find((option) => option.textFree === "");

  if (isTextFree === undefined) {
    SurveyData.questions[index].options.push({ ...freeOption });
    console.log(SurveyData);
  } else {
    // delOption(index, optionIndex);
    // SurveyData.questions[index].options.forEach((option) => delete option.textFree);
    // console.log("удалил");
    // console.log(SurveyData);
  }
};
</script>

<template>
  <!-- Вопросы -->
  <div class="row justify-center flex-center q-mt-lg">
    <h5>Вопросы</h5>
    {{ SurveyData }}
    <q-btn dense class="q-btn--form q-ml-sm" color="primary" @click="addQuestions">Добавить вопрос</q-btn>
  </div>
  <div class="questions-wrapper">
    <div v-for="(question, questionIndex) in SurveyData.questions" :key="questionIndex" class="question">
      <div class="flex">
        <span>Вопрос {{ questionIndex + 1 }}</span>
        <q-btn size="xs" class="btn-delete" dense color="negative" @click="delQuestion(questionIndex)">
          Удалить вопрос
        </q-btn>
      </div>
      <q-select
        v-model="question.type"
        label="Тип вопроса*"
        :options="questionTypeSelect"
        map-options
        class="q-mb-sm"
        emit-value />

      <q-input v-model="question.text" class="q-mb-sm" label="Текст вопроса*" />
      <q-input v-model="question.description" autogrow class="q-mb-sm" label="Пояснения" />

      <!-- Ответы -->
      <div v-for="(option, optionIndex) in SurveyData.questions[questionIndex].options" :key="optionIndex">
        <div class="flex">
          <span>Ответ {{ optionIndex + 1 }}</span>
          <q-btn class="btn-delete" dense size="xs" color="negative" @click="delOption(questionIndex, optionIndex)">
            Удалить ответ
          </q-btn>
        </div>

        <q-input v-model="option.text" class="q-mb-sm" label="Тектс ответа*" />
      </div>
      <div class="row no-wrap q-mt-lg">
        <q-checkbox v-model="textFree" @update:model-value="addFreeOption(questionIndex)" />
        <q-btn label="Добавить ответ" class="q-btn--form" color="primary" @click="addOptions(questionIndex)"></q-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-delete {
  height: unset;
}
.questions-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  .question {
    display: flex;
    flex-direction: column;
  }
}
</style>

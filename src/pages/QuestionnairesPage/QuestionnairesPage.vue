<script setup lang="ts">
import { provide, ref } from "vue";

import QuestionForm from "./QuestionForm.vue";
import { TQuestionnairePayload } from "./types";

const defaultOption = { text: "" };
const freeOption = { textFree: "" };
const SurveyData = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [],
});

const addQuestions = () => {
  SurveyData.value.questions.push({
    text: "",
    description: "",
    type: "",
    options: [],
  });
};

const delQuestion = (index: number) => {
  SurveyData.value.questions.splice(index, 1);
};

const addOptions = (index: number) => {
  SurveyData.value.questions[index].options.push({ ...defaultOption });
};

const delOption = (questionIndex: number, optionIndex: number) => {
  SurveyData.value.questions[questionIndex].options.splice(optionIndex, 1);
};

const addFreeOption = (index: number) => {
  const isTextFree = SurveyData.value.questions[index].options.find((option) => option.textFree === "");

  if (isTextFree === undefined) {
    SurveyData.value.questions[index].options.push({ ...freeOption });
    console.log(SurveyData);
  } else {
    // delOption(index, optionIndex);
    // SurveyData.questions[index].options.forEach((option) => delete option.textFree);
    // console.log("удалил");
    // console.log(SurveyData);
  }
};

provide("SurveyData", { SurveyData, delQuestion, addOptions, delOption, addFreeOption });
</script>

<template>
  <div class="main-container">
    <h4>Создать анкету</h4>
    <div class="row justify-center no-wrap q-mt-lg">
      <q-btn label="Сохранить анкету" class="q-btn--form" color="primary"></q-btn>
    </div>
    <q-form class="fit q-mb-sm form">
      <q-input v-model="SurveyData.title" class="fit q-mb-sm" label="Название анкеты*" />
      <q-input v-model="SurveyData.description" type="textarea" class="fit q-mb-sm" label="Описание анкеты" />
    </q-form>
    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg">
      <h5>Вопросы</h5>
      {{ SurveyData }}
      <q-btn dense class="q-btn--form q-ml-sm" color="primary" @click="addQuestions">Добавить вопрос</q-btn>
    </div>
    <div class="questions-wrapper">
      <QuestionForm
        v-for="(question, questionIndex) in SurveyData.questions"
        :key="questionIndex"
        :question="question"
        class="question" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

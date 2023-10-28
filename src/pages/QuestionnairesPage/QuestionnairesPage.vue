<script setup lang="ts">
import { provide, ref } from "vue";

import { SurveyInjectionKey } from "@/injectionKeys";

import QuestionForm from "./QuestionForm.vue";
import { TDefaultOption, TDefaultQuestion, TQuestionnairePayload } from "./types";

const defaultOption = { text: "" } as TDefaultOption;
const defaultQuestion = { text: "", description: "", type: "", options: [] } as TDefaultQuestion;
// const freeOption = { textFree: "" };
const surveyData = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [],
});

const addQuestions = () => {
  surveyData.value.questions.push({ ...defaultQuestion });
};

const delQuestion = (index: number) => {
  surveyData.value.questions.splice(index, 1);
};

const addOptions = (index: number) => {
  surveyData.value.questions[index].options.push({ ...defaultOption });
};

const delOption = (questionIndex: number, optionIndex: number) => {
  surveyData.value.questions[questionIndex].options.splice(optionIndex, 1);
};

// const addFreeOption = (index: number) => {
//   const isTextFree = surveyData.value.questions[index].options.find((option) => option.textFree === "");

//   if (isTextFree === undefined) {
//     surveyData.value.questions[index].options.push({ ...freeOption });
//     console.log(surveyData);
//   } else {
//     // delOption(index, optionIndex);
//     // surveyData.questions[index].options.forEach((option) => delete option.textFree);
//     // console.log("удалил");
//     // console.log(surveyData);
//   }
// };

provide(SurveyInjectionKey, { surveyData, delQuestion, addOptions, delOption });
</script>

<template>
  <div class="main-container">
    <h4>Создать анкету</h4>
    <div class="row justify-center no-wrap q-mt-lg">
      <q-btn label="Сохранить анкету" class="q-btn--form" color="primary"></q-btn>
    </div>
    <q-form class="fit q-mb-sm form">
      <q-input v-model="surveyData.title" class="fit q-mb-sm" label="Название анкеты*" />
      <q-input v-model="surveyData.description" type="textarea" class="fit q-mb-sm" label="Описание анкеты" />
    </q-form>
    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg">
      <h5>Вопросы</h5>
      {{ surveyData }}
      <q-btn dense class="q-btn--form q-ml-sm" color="primary" @click="addQuestions">Добавить вопрос</q-btn>
    </div>
    <div class="questions-wrapper">
      <QuestionForm
        v-for="(question, questionIndex) in surveyData.questions"
        :key="questionIndex"
        v-model:question="surveyData.questions[questionIndex]"
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

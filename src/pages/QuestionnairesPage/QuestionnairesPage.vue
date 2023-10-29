<script setup lang="ts">
import { ref } from "vue";

import { TDefaultQuestion, TQuestionnairePayload } from "./types";

const SurveyData = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [],
});
const defaultOption = { text: "" };
const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];

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

const addOptions = (questionIndex: number) => {
  SurveyData.value.questions[questionIndex].options.push({ ...defaultOption });
};

const delOption = (questionIndex: number, optionIndex: number) => {
  SurveyData.value.questions[questionIndex].options.splice(optionIndex, 1);
};

const cheangeTypeQuestion = (question: TDefaultQuestion) => {
  console.log(question);
};
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
          emit-value
          @update:model-value="cheangeTypeQuestion(question)" />

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
          <q-btn label="Добавить ответ" class="q-btn--form" color="primary" @click="addOptions(questionIndex)"></q-btn>
        </div>
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

//TODO: можно сделать разделение компонентов в будущем попытка разделения сохранена в ветке devQuestionnaire

<script setup lang="ts">
import { ref } from "vue";

import { useQuestionnairesStore } from "@/stores/questionnairesStore";
import notify from "@/utils/notify";

import { TQuestionnairePayload, TQuestionType } from "./types";

const SurveyData = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [],
});
const defaultOption = { text: "" };
const questionTypeSelect = [
  { value: "single", label: "Один из списка" },
  { value: "many", label: "Несколько из списка" },
  { value: "text", label: "Текст" },
];
const isManyFrom = ref(false);
const questionnairesStore = useQuestionnairesStore();

const handleNewQuestionnaires = () => {
  questionnairesStore.requestNewQuestionnaire(1, SurveyData.value);
};

const addQuestions = () => {
  SurveyData.value.questions.push({
    text: "",
    description: "",
    type: "single",
    options: [{ text: "Вариант 1" }, { text: "" }],
    other: {
      show: false,
      text: "",
    },
  });
};

const delQuestion = (index: number) => {
  SurveyData.value.questions.splice(index, 1);
};

const addOptions = (questionIndex: number, optionIndex: number) => {
  if (SurveyData.value.questions[questionIndex].options[optionIndex].text === "") {
    SurveyData.value.questions[questionIndex].options.push({ ...defaultOption });
    SurveyData.value.questions[questionIndex].options[optionIndex].text = `Вариант ${optionIndex + 1}`;
  }
};

const delOption = (questionIndex: number, optionIndex: number) => {
  if (SurveyData.value.questions[questionIndex].options.length > 2) {
    SurveyData.value.questions[questionIndex].options.splice(optionIndex, 1);
  } else {
    notify({
      type: "negative",
      message: "Вопрос должен содержать не менее двух вариантов ответа",
    });
  }
};

const changeTypeQuestion = (questionIndex: number, type: TQuestionType) => {
  if (type === "text") {
    SurveyData.value.questions[questionIndex].other.show = true;
    SurveyData.value.questions[questionIndex].options = [{ text: "Вариант 1" }, { text: "" }];
  } else {
    SurveyData.value.questions[questionIndex].other.show = false;
  }
};
</script>

<template>
  <div class="main-container">
    <h4>Создать анкету</h4>
    <div class="row justify-center no-wrap q-mt-lg">
      <q-btn label="Сохранить анкету" class="q-btn--form" color="primary" @click="handleNewQuestionnaires"></q-btn>
    </div>
    <q-form class="fit q-mb-sm form">
      <q-input v-model="SurveyData.title" class="fit q-mb-sm" label="Название анкеты*" />
      <q-input v-model="SurveyData.description" type="textarea" class="fit q-mb-sm" label="Описание анкеты" />
    </q-form>

    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg">
      <h5>Вопросы</h5>
      <q-btn dense class="q-btn--form q-ml-sm" color="primary" @click="addQuestions">Добавить вопрос</q-btn>
    </div>
    <div class="questions-wrapper">
      <div v-for="(question, questionIndex) in SurveyData.questions" :key="questionIndex" class="question">
        <q-select
          v-model="question.type"
          label="Тип вопроса*"
          :options="questionTypeSelect"
          map-options
          class="q-mb-sm"
          emit-value
          @update:model-value="(value) => changeTypeQuestion(questionIndex, value)" />
        <q-input v-model="question.text" class="q-mb-sm" label="Текст вопроса*" />
        <q-input v-model="question.description" autogrow class="q-mb-sm" label="Пояснения" />

        <!-- Ответы -->
        <div v-for="(option, optionIndex) in SurveyData.questions[questionIndex].options" :key="optionIndex">
          <div v-if="SurveyData.questions[questionIndex].type !== 'text'" class="option">
            <q-checkbox v-if="question.type === 'many'" v-model="isManyFrom" disable />
            <q-radio v-if="question.type === 'single'" v-model="question.text" val="line" disable />
            <q-input
              v-model="option.text"
              class="option__input"
              label="Текст ответа*"
              @click="addOptions(questionIndex, optionIndex)" />
            <q-icon
              :name="'close'"
              style="font-size: large; cursor: pointer"
              @click="delOption(questionIndex, optionIndex)" />
          </div>
        </div>
        <q-input v-if="question.other.show" v-model="question.other.text" disable class="q-mb-sm" label="Другое" />
        <div v-if="question.type !== 'text'">
          <q-checkbox
            v-model="question.other.show"
            label="Добавить вариант Другое"
            @click="SurveyData.questions[questionIndex].other.show" />
        </div>
        <div class="question-delete">
          <q-icon class="btn-delete" :name="'delete'" label="asd" @click="delQuestion(questionIndex)" />
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
  .question-delete {
    display: flex;
    justify-content: end;
    font-size: large;
    cursor: pointer;
    color: $negative;
  }
  .option {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    flex-wrap: nowrap;
    &__input {
      flex-grow: 2;
    }
  }
}
</style>

//TODO: можно сделать разделение компонентов в будущем попытка разделения сохранена в ветке devQuestionnaire

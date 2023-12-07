<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import type { TAnswer, TOther } from "@/pages/ParentedAnswerQuesstionnairePage/types";

const { SurveyData, router, questionnairesStore } = useQuestionnaire();

const { questionnaire } = storeToRefs(questionnairesStore);

const radio = ref<Record<number, number>>({});
const checked = ref<number[]>([]);
const text = ref([]);
const answers = ref<{ radio: TAnswer[]; checked: TAnswer[] }>({ radio: [], checked: [] });
const other = ref<TOther[]>([]);
const temp = ref([]);

const checkIsNumber = (arg?: number | null): arg is number => {
  return arg !== undefined && arg !== null && typeof arg === "number";
};
const clearOther = (questionId: number) => (other.value = other.value.filter((item) => item.questionId !== questionId));
const addRadio = (questionId?: number | null, optionId?: number | null) => {
  if (!checkIsNumber(questionId) || !checkIsNumber(optionId)) {
    return;
  }

  answers.value.radio = answers.value.radio.filter((item) => item.questionId !== questionId);
  answers.value.radio.push({ questionId, optionId });
  clearOther(questionId);
};

const addChecked = (questionId?: number | null, optionId?: number | null) => {
  if (!checkIsNumber(questionId) || !checkIsNumber(optionId)) {
    return;
  }
  answers.value.checked =
    answers.value.checked.findIndex((el) => el.optionId === optionId) > -1
      ? answers.value.checked.filter((el) => el.optionId !== optionId)
      : [...answers.value.checked, { questionId, optionId }];

  other.value = other.value.filter((item) => item.text !== undefined && item.text !== "");
};

const addOtherAnswer = (text: string, questionId?: number | null) => {
  if (typeof questionId !== "number") {
    return;
  }

  clearOther(questionId);
  other.value.push({ questionId, text });
};

const filterAnswers = (questionIndex: number, questionId?: number | null) => {
  if (typeof questionId !== "number") {
    return;
  }

  answers.value.radio = answers.value.radio.filter((item) => item.optionId !== radio.value[questionIndex]);
  delete radio.value[questionIndex];
  other.value = other.value.filter(
    (item) => item.questionId !== questionId && item.text !== undefined && item.text !== "",
  );
  other.value.push({ questionId: questionId, text: text.value[questionIndex] });
};

const submitSurvey = () => {
  questionnairesStore
    .setSelectedParentedAnswers(
      Number(router.currentRoute.value.params.id),
      [...answers.value.radio, ...answers.value.checked],
      other.value,
    )
    .then(() => router.push({ name: "My", query: { tabId: "questionaries" } }));
};

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    questionnairesStore
      .showQuestionnaire(Number(router.currentRoute.value.params.id))
      .then(() => (SurveyData.value = questionnaire.value));

    questionnairesStore
      .getSelectedParentedAnswers(Number(router.currentRoute.value.params.id))
      .then(() => (temp.value = questionnairesStore.temp));
  }
});
</script>

<template>
  <div class="main-container survey">
    <div class="column justify-center flex-center q-mb-lg">
      <h2 class="survey__title q-mb-sm">{{ SurveyData.title }}</h2>
      <p class="survey__description subtitle q-mb-sm">{{ SurveyData.description }}</p>
      <p class="survey__answerBefore q-mb-sm">Ответить до: {{ SurveyData.answerBefore }}</p>
    </div>

    <!-- <p>Выбаранные ответы (уходят на бэк): {{ selected }}</p>
    <p>Другое (уходят на бэк): {{ other }}</p>
    <p>Answers: {{ answers }}</p>
    <p>Checked: {{ checked }}</p>
    <p>Radio: {{ radio }}</p>
    <p>Text: {{ text }}</p> -->

    <!-- Вопросы -->
    <div class="questions-wrapper">
      <div v-for="(question, questionIndex) in SurveyData.questions" :key="questionIndex" class="question shadow-1">
        <p class="question__title subtitle q-mb-sm">{{ question.text }}</p>
        <p class="question__description subtitle q-mb-sm">{{ question.description }}</p>
        <!-- Ответы -->
        <div v-for="(option, optionIndex) in SurveyData.questions[questionIndex].options" :key="optionIndex">
          <div v-if="SurveyData.questions[questionIndex].type !== 'text'" class="option">
            <q-checkbox
              v-show="question.type === 'many'"
              v-model="checked"
              :val="option.id"
              @update:model-value="addChecked(SurveyData.questions[questionIndex].id, option.id)" />
            <q-radio
              v-show="question.type === 'single'"
              v-model="radio[questionIndex]"
              :val="option.id"
              @update:model-value="addRadio(SurveyData.questions[questionIndex].id, option.id)" />
            {{ option.text }}
          </div>
        </div>
        <div v-if="SurveyData.questions[questionIndex].other" class="option">
          <q-input
            v-model="text[questionIndex]"
            class="option__input"
            label="Свой ответ"
            outlined
            autogrow
            @click="filterAnswers(questionIndex, SurveyData.questions[questionIndex].id)"
            @update:model-value="addOtherAnswer(text[questionIndex], SurveyData.questions[questionIndex].id)" />
        </div>
      </div>
    </div>
    <div class="fit flex flex-center q-mt-sm">
      <q-btn label="Отправить" class="q-btn--form" color="primary" @click="submitSurvey"></q-btn>
    </div>

    <!-- <h5>Ответы</h5>
    <div>
      <ul v-for="(question, questionIndex) in temp.questions" :key="questionIndex">
        Вопрос:{{
          question.text
        }}
        <p>Ответы:</p>
        <li v-for="(option, optionIndex) in question.options" :key="optionIndex">{{ option.text }}</li>
        <p v-if="question.option_other">Другое: {{ question.option_other.text }}</p>
      </ul>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.survey {
  &__title {
    color: var(--black);
  }
  &__description {
    color: var(--grey-1);
  }
  &__answerBefore {
  }
}
.btn-delete {
  height: unset;
}
.questions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .question {
    background: var(--q-background-primary);
    border-radius: 16px;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    &__title {
      color: var(--grey-2);
    }
    &__description {
      color: var(--text-color);
    }
  }
  .question-delete {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    font-size: xx-large;
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

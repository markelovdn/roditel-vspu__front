<script setup lang="ts">
import { ValidationArgs } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { TQuestionnairePayload } from "@/api/Questionnaires/types";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import { maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";

const {
  submitQuestionnaires,
  addQuestions,
  delQuestion,
  addOptions,
  delOption,
  changeTypeQuestion,
  SurveyData,
  router,
  questionnairesStore,
} = useQuestionnaire();

const emit = defineEmits(["validation-change", "update:model-value"]);

const questionTypeSelect = [
  { value: "single", label: "Один из списка" },
  { value: "many", label: "Несколько из списка" },
  { value: "text", label: "Текст" },
];
const isManyType = ref(false);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TQuestionnairePayload>(SurveyData, emit, {
  title: { requiredValidator, maxLengthValidator: maxLengthValidator(255) },
  description: { maxLengthValidator: maxLengthValidator(255) },
  questions: {
    $each: helpers.forEach({
      text: { requiredValidator },
    }),
  } as ValidationArgs,
});

const { questionnaire } = storeToRefs(questionnairesStore);

const back = () => {
  router.push({ name: "My", query: { tabId: "questionnaires" } });
};

onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    await questionnairesStore.showQuestionnaire(Number(router.currentRoute.value.params.id));
    SurveyData.value = questionnaire.value;

    SurveyData.value.questions.forEach((question) => {
      question.options.push({ text: "" });
      if (question.other === null) {
        question.other = { show: false, text: "" };
      }
    });
  }
});
</script>

<template>
  <div class="main-container">
    <h4>Создать анкету</h4>
    <q-form class="fit q-mb-sm form">
      <q-input
        v-bind="getErrorAttrs('title')"
        v-model="SurveyData.title"
        class="fit q-mb-sm"
        label="Название анкеты*"
        @blur="handleBlur('title')" />
      <q-input v-model="SurveyData.description" autogrow class="q-mb-sm" label="Описание анкеты" />
      <q-input v-model="SurveyData.answerBefore" mask="##.##.####" label="Ответить до:">
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="SurveyData.answerBefore" mask="DD.MM.YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-form>

    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg q-mb-lg">
      <h5>Вопросы</h5>
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
        <q-input
          v-bind="getErrorAttrs('questions', 'text', questionIndex)"
          v-model="question.text"
          autogrow
          class="q-mb-sm"
          label="Текст вопроса*"
          @blur="handleBlur('text')" />
        <q-input v-model="question.description" autogrow class="q-mb-sm" label="Пояснения" />

        <!-- Ответы -->
        <div v-for="(option, optionIndex) in SurveyData.questions[questionIndex].options" :key="optionIndex">
          <div v-if="SurveyData.questions[questionIndex].type !== 'text'" class="option">
            <q-checkbox v-show="question.type === 'many'" v-model="isManyType" disable />
            <q-radio v-show="question.type === 'single'" v-model="question.text" val="line" disable />
            <q-input
              v-model="option.text"
              class="option__input"
              label="Текст ответа*"
              @click="addOptions(questionIndex, optionIndex)" />
            <q-icon
              v-show="option.text !== ''"
              :name="'close'"
              style="font-size: large; cursor: pointer"
              @click="delOption(questionIndex, optionIndex)" />
          </div>
        </div>
        <div v-show="question.type !== 'text'" class="option">
          <q-checkbox
            v-model="question.other.show"
            label="Добавить вариант Другое"
            @click="SurveyData.questions[questionIndex].other.show" />
        </div>
        <div v-if="question.other.show" class="option">
          <q-input v-model="question.other.text" disable class="option__input" label="Другое" />
        </div>
        <div class="question-delete">
          <q-icon class="btn-delete" :name="'delete'" label="" @click="delQuestion(questionIndex)" />
        </div>
      </div>
    </div>
    <div class="add-question">
      <q-btn class="q-btn--form q-mt-sm float-right" color="primary" @click="addQuestions">Добавить вопрос</q-btn>
    </div>
    <div class="footer">
      <q-btn
        label="Сохранить анкету"
        class="q-btn--form q-mt-lg float-right"
        color="primary"
        :disable="!isValid"
        @click="submitQuestionnaires"></q-btn>
      <q-btn label="Назад" class="q-btn--form q-mt-lg float-left" color="grey-2" @click="back"></q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  width: 640px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: $mobile-max-width) {
    width: 100%;
  }
}
.btn-delete {
  height: unset;
}
.questions-wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  .question {
    display: flex;
    flex-direction: column;
    background: var(--q-background-primary);
    border-radius: 16px;
    padding: 20px;
    width: 100%;
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
.add-question {
  display: inline-block;
  width: 100%;
}
.footer {
  display: inline-block;
  width: 100%;

  @media (max-width: $mobile-max-width) {
    padding-bottom: 100px;
  }
}
</style>

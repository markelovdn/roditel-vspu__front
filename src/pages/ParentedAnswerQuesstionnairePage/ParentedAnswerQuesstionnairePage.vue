<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import type { TAnswere, TOther } from "@/pages/ParentedAnswerQuesstionnairePage/types";

const { SurveyData, router, questionnairesStore } = useQuestionnaire();

const { questionnaire } = storeToRefs(questionnairesStore);

const radio = ref<Record<number, number>>({});
const checked = ref<number[]>([]);
const text = ref([]);
const answeres = ref<{ radio: TAnswere[]; checked: TAnswere[] }>({ radio: [], checked: [] });
const selected = computed(() => [...answeres.value.radio, ...answeres.value.checked]);
const other = ref<TOther[]>([]);
const temp = ref([]);

const addRadio = (questionId: number, optionId: number) => {
  answeres.value.radio = answeres.value.radio.filter((item) => item.questionId !== questionId);
  answeres.value.radio.push({ questionId, optionId });
  other.value = other.value.filter((item) => item.questionId !== questionId);
};

const addChecked = (questionId: number, optionId: number) => {
  checked.value.forEach((checkedItem) => {
    const existingItem = answeres.value.checked.find((selectedItem) => selectedItem.optionId === checkedItem);
    if (!existingItem) {
      answeres.value.checked.push({ questionId, optionId });
    }
  });
  answeres.value.checked = answeres.value.checked.filter((selectedItem) =>
    checked.value.includes(selectedItem.optionId),
  );

  other.value = other.value.filter((item) => item.text !== undefined && item.text !== "");
};

const addOtherAnswer = (questionId: number, text: string) => {
  other.value = other.value.filter((item) => item.questionId !== questionId);
  other.value.push({ questionId, text });
};

const filterAnswers = (questionIndex: number, questionId: number) => {
  answeres.value.radio = answeres.value.radio.filter((item) => item.optionId !== radio.value[questionIndex]);
  delete radio.value[questionIndex];
  other.value = other.value.filter(
    (item) => item.questionId !== questionId && item.text !== undefined && item.text !== "",
  );
  other.value.push({ questionId: questionId, text: text.value[questionIndex] });
};

const submitSelected = () => {
  questionnairesStore.setSelectedParentedAnsweres(
    Number(router.currentRoute.value.params.id),
    selected.value,
    other.value,
  );
  router.push({ name: "My" });
};

onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    await questionnairesStore.showQuestionnaire(Number(router.currentRoute.value.params.id));
    SurveyData.value = questionnaire.value;
  }

  await questionnairesStore.getSelectedParentedAnsweres(Number(router.currentRoute.value.params.id));
  temp.value = questionnairesStore.temp;
});
</script>

<template>
  <div class="main-container">
    <p class="q-mb-sm" label="Название анкеты*">{{ SurveyData.title }}</p>
    <p class="q-mb-sm" label="Название анкеты*">{{ SurveyData.description }}</p>
    <p class="q-mb-sm" label="Название анкеты*">Ответить до: {{ SurveyData.answerBefore }}</p>
    <!-- <p>Выбаранные ответы (уходят на бэк): {{ selected }}</p>
    <p>Другое (уходят на бэк): {{ other }}</p>
    <p>Answeres: {{ answeres }}</p>
    <p>Checked: {{ checked }}</p>
    <p>Radio: {{ radio }}</p>
    <p>Text: {{ text }}</p> -->
    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg">
      <h5>Вопросы</h5>
    </div>
    <div class="questions-wrapper">
      <div v-for="(question, questionIndex) in SurveyData.questions" :key="questionIndex" class="question">
        <p class="q-mb-sm" label="Текст вопроса*">{{ question.text }}</p>
        <p class="q-mb-sm" label="Текст вопроса*">{{ question.description }}</p>
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
            @click="filterAnswers(questionIndex, SurveyData.questions[questionIndex].id)"
            @update:model-value="addOtherAnswer(SurveyData.questions[questionIndex].id, text[questionIndex])" />
        </div>
      </div>
    </div>
    <q-btn label="Отправить" class="q-btn--form" color="primary" @click="submitSelected"></q-btn>
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

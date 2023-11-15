<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const { SurveyData, router, questionnairesStore } = useQuestionnaire();

const { questionnaire } = storeToRefs(questionnairesStore);

type TAnswere = {
  questionId: number;
  optionId?: number;
};

type TOption = Record<number, number>;

const radio = ref<TOption>({});
const checked = ref<number[]>([]);
const text = ref([]);
const answeres = ref<{ radio: TAnswere[]; checked: TAnswere[] }>({ radio: [], checked: [] });
const selected = computed(() => [...answeres.value.radio, ...answeres.value.checked]);
const other = ref<{ questionId: number; text: string | undefined }[]>([]);

const addRadio = (questionId: number, optionId: number) => {
  answeres.value.radio = answeres.value.radio.filter((item) => item.questionId !== questionId);
  answeres.value.radio.push({ questionId, optionId });
};

const addChecked = (questionId: number, optionId: number) => {
  checked.value.forEach((checkedItem) => {
    const existingItem = answeres.value.checked.find((selectedItem) => selectedItem.optionId === checkedItem);
    if (!existingItem) {
      answeres.value.checked.push({ questionId, optionId });
    }
  });

  answeres.value.checked = answeres.value.checked.filter((selectedItem) => {
    if (selectedItem.optionId) {
      checked.value.includes(selectedItem.optionId);
    }
  });
};

const addOtherAnswer = (questionId: number, text: string) => {
  other.value = other.value.filter((item) => item.questionId !== questionId);
  other.value.push({ questionId, text });
};

const filterAnswers = (questionIndex: number) => {
  answeres.value.radio = answeres.value.radio.filter((item) => item.optionId !== radio.value[questionIndex]);
  delete radio.value[questionIndex];
};

onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    await questionnairesStore.showQuestionnaire(Number(router.currentRoute.value.params.id));
    SurveyData.value = questionnaire.value;
    // radio.value = new Array(SurveyData.value.questions.length);
  }
});
</script>

<template>
  <div class="main-container">
    <p class="q-mb-sm" label="Название анкеты*">{{ SurveyData.title }}</p>
    <p class="q-mb-sm" label="Название анкеты*">{{ SurveyData.description }}</p>
    <p class="q-mb-sm" label="Название анкеты*">{{ SurveyData.answerBefore }}</p>
    <p>Выбаранные ответы: {{ selected }}</p>
    <p>Answeres: {{ answeres }}</p>
    <p>Другое: {{ other }}</p>
    <p>Checked: {{ checked }}</p>
    <p>Radio: {{ radio }}</p>
    <p>Text: {{ text }}</p>
    <!-- Вопросы -->
    <div class="row justify-center flex-center q-mt-lg">
      <h5>Вопросы</h5>
    </div>
    <div class="questions-wrapper">
      <div v-for="(question, questionIndex) in SurveyData.questions" :key="questionIndex" class="question">
        <p class="q-mb-sm" label="Текст вопроса*">{{ question.text }}</p>
        <p class="q-mb-sm" label="Текст вопроса*">{{ question.description }}</p>
        <!-- Ответы -->
        <div
          v-for="(option, optionIndex) in SurveyData.questions[questionIndex].options"
          :key="option.id + optionIndex">
          <div v-if="SurveyData.questions[questionIndex].type !== 'text'" class="option">
            {{ optionIndex }}
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
        <div class="option">
          <q-input
            v-model="text[questionIndex]"
            class="option__input"
            label="Другое"
            @click="filterAnswers(questionIndex)"
            @update:model-value="addOtherAnswer(SurveyData.questions[questionIndex].id, text[questionIndex])" />
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

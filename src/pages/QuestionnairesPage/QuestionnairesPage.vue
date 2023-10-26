<script setup lang="ts">
import { ref } from "vue";

import { TQuestionnairePayload } from "./types";

const DATA = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [
    {
      text: "",
      description: "",
      type: "",
      options: [{ text: "" }],
    },
  ],
});

const questionTypeSelect = [
  { value: "text", label: "Свой ответ" },
  { value: "single", label: "Одиночный ответ" },
  { value: "many", label: "Множественный выбор" },
];

const addQuestions = () => {
  DATA.value.questions.push({
    text: "",
    description: "",
    type: "",
    options: [{ text: "" }],
  });
};

const delQuestion = (idxq: number) => {
  DATA.value.questions.splice(idxq, 1);
};

const addOptions = (qidx: number) => {
  DATA.value.questions[qidx].options.push({ text: "" });
};

const delOption = (idxq: number, idxO: number) => {
  console.log(idxq, idxO);
  DATA.value.questions[idxq].options.splice(idxO, 1);
};
</script>

<template>
  <div class="main-container">
    <h4>Анкета</h4>
    <div class="row no-wrap q-mt-lg">
      <q-btn label="Сохранить анкету" class="q-btn--form" color="primary"></q-btn>
    </div>
    <q-form class="fit q-mb-sm form">
      <q-input
        v-model="DATA.title"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Название анкеты*"
        borderless
        color="primary" />

      <q-input
        v-model="DATA.description"
        type="textarea"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Описание анкеты"
        borderless
        color="primary" />
    </q-form>
    <h5>Вопросы</h5>
    <div class="fit row wrap justify-start items-start content-start">
      <div v-for="(item, idxq) in DATA.questions" :key="idxq">
        <span>Вопрос {{ idxq + 1 }}</span>
        <p>
          <q-btn label="x" color="negative" @click="delQuestion(idxq)"></q-btn>
        </p>
        <q-select
          v-model="item.type"
          input-class="q-select--form"
          label="Тип вопроса*"
          :options="questionTypeSelect"
          :option-label="(item) => item.label"
          outlined
          class="fit q-mb-sm"
          map-options
          emit-value />

        <q-input
          v-model="item.text"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Текст вопроса*"
          borderless
          color="primary" />

        <q-input
          v-model="item.description"
          type="textarea"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Поясненния"
          borderless
          color="primary" />
        <div v-for="(itemO, idx) in DATA.questions[idxq].options" :key="idx">
          <span>Ответ {{ idx + 1 }}</span>
          <p>
            <q-btn label="x" color="negative" @click="delOption(idxq, idx)">{{ idx }}</q-btn>
          </p>
          <q-input
            v-model="itemO.text"
            outlined
            class="fit q-mb-sm"
            input-class="q-input--form"
            label="Тектс ответа*"
            borderless
            color="primary" />
        </div>
        <div class="row no-wrap q-mt-lg">
          <q-btn label="Добавить ответ" class="q-btn--form" color="primary" @click="addOptions(idxq)"></q-btn>
        </div>
      </div>
    </div>
    <div class="row no-wrap q-mt-lg">
      <q-btn label="Добавить вопрос" class="q-btn--form" color="primary" @click="addQuestions"></q-btn>
    </div>
  </div>
</template>

<style scoped></style>

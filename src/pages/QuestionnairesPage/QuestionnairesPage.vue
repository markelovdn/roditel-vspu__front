<script setup lang="ts">
import { provide, ref } from "vue";

import { SurveyDataKey } from "./keys";
import QuestionForm from "./QuestionForm.vue";
import { TQuestionnairePayload } from "./types";

const SurveyData = ref<TQuestionnairePayload>({
  title: "",
  description: "",
  questions: [
    // {
    //   text: "",
    //   description: "",
    //   type: "",
    //   options: [
    //     {
    //       text: "фыв",
    //     },
    //     {
    //       textFree: "ячс",
    //     },
    //   ],
    // },
  ],
});

provide(SurveyDataKey, SurveyData.value);
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
    <QuestionForm />
  </div>
</template>

<style lang="scss" scoped></style>

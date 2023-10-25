<script setup lang="ts">
import { ref } from "vue";

import { type TOptions } from "@/pages/QuestionnairesPage/types";

const text = ref("");
const description = ref("");
const options = ref<TOptions>({
  id: null,
  text: "",
});

const addOption = () => {
  options.value = [id: 1, text: '234'];
};
</script>

<template>
  <q-form class="fit q-mb-sm form">
    <h7>Вопрос</h7>
    <q-input
      v-model="text"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Текст вопроса*"
      borderless
      color="primary" />

    <q-input
      v-model="description"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Описание"
      borderless
      color="primary" />
    <h7>Ответы</h7>
    {{ options }}
    <div v-for="(option, index) in options" :key="index" class="row no-wrap q-mt-lg">
      <q-input
        v-model="options.text"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Текст ответа*"
        borderless
        color="primary" />
      <q-btn label="-" class="q-btn--form" color="negative"></q-btn>
    </div>
  </q-form>
  <div class="row no-wrap q-mt-lg">
    <q-btn label="Добавить ответ" class="q-btn--form" color="primary" @click="addOption()"></q-btn>
  </div>
</template>

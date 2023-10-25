<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
const description = ref("");
</script>

<template>
  <q-form class="fit q-mb-sm form">
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
  </q-form>
  <div class="row no-wrap q-mt-lg">
    <q-btn label="Добавить" class="q-btn--form" color="primary"></q-btn>
  </div>
</template>

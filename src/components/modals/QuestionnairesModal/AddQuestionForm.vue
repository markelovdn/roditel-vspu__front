<script setup lang="ts">
import { computed } from "vue";

import { TQuestionnaire } from "@/components/modals/QuestionnairesModal/types";
import { requiredValidator, useValidation } from "@/hooks/useValidation";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TQuestionnaire;
}>();

const data = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:model-value", e);
  },
});

const { handleBlur, getErrorAttrs, isValid } = useValidation<TQuestionnaire>(data, emit, {
  questions: [{ text: { requiredValidator } }],
});
</script>

<template>
  <q-form class="fit q-mb-sm form">
    <q-input
      v-bind="getErrorAttrs('text')"
      v-model="data.questions.text"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Название*"
      borderless
      color="primary"
      @blur="handleBlur('title')" />

    <q-input
      v-bind="getErrorAttrs('description')"
      v-model="data.description"
      type="textarea"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Описание"
      borderless
      color="primary"
      @blur="handleBlur('description')" />
  </q-form>

  <div class="row no-wrap q-mt-lg">
    <q-btn label="Добавить вопрос" :disable="!isValid" class="q-btn--form" color="primary"></q-btn>
  </div>
</template>

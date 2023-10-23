<script setup lang="ts">
import { computed, ref } from "vue";

import { TQuestionnairePayload } from "@/api/Questionnaires/types";
import { requiredValidator, useValidation } from "@/hooks/useValidation";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TQuestionnairePayload;
}>();

const date = ref();
const dateToString = computed(() => date.value);
const dateClear = () => {
  date.value = null;
  // setData();
};

// const setData = (value?: any) => {
//   value ? (filters.value.dateBetween = `${value.from}, ${value.to}`) : delete filters.value["dateBetween"];
//   filters.value.page = 1;
//   emit("setFilters", filters.value);
// };

const data = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:model-value", e);
  },
});
const { handleBlur, getErrorAttrs } = useValidation<TQuestionnairePayload>(data, emit, {
  title: { requiredValidator },
  description: "",
  answerBefore: { requiredValidator },
});
</script>

<template>
  <q-form class="fit q-mb-sm form">
    <q-input
      v-bind="getErrorAttrs('title')"
      v-model="data.title"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Название*"
      borderless
      color="primary"
      @blur="handleBlur('title')" />

    <q-input
      v-bind="getErrorAttrs('description')"
      v-model="data.title"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Описание"
      borderless
      color="primary"
      @blur="handleBlur('description')" />

    <q-input v-model="dateToString" filled>
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
                <q-btn v-close-popup label="Сбросить" color="primary" flat @click="dateClear()" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-form>
</template>

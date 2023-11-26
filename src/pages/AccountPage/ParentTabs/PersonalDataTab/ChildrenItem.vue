<script setup lang="ts">
import { emit } from "process";
import { ref } from "vue";

import { maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";

const props = defineProps<{ index: number }>();

const data = defineModel({
  required: true,
  default: {
    age: 3,
  },
});

const isDisable = ref(true);

const { handleBlur, getErrorAttrs } = useValidation(data, emit, {
  age: { requiredValidator, maxLengthValidator: maxLengthValidator(2) },
});

const changeDisable = () => {
  isDisable.value = !isDisable.value;
};
</script>

<template>
  <div class="wrapper">
    <q-input
      v-bind="getErrorAttrs('age')"
      v-model="data.age"
      type="number"
      outlined
      class="children-input"
      input-class="q-input--form"
      :label="`Возраст ребенка №${props.index + 1}*`"
      borderless
      color="primary"
      :disable="isDisable"
      @blur="handleBlur('age')" />
    <q-btn padding="xs" icon="edit" size="xs" color="primary" @click="changeDisable"></q-btn>
    <q-btn padding="xs" size="xs" icon="delete" color="negative"></q-btn>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-grow: 1;
  display: flex;
  gap: 20px;
}

.children-input {
  flex-basis: 100%;
}
</style>

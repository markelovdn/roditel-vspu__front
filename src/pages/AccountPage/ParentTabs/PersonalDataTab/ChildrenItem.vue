<script setup lang="ts">
import { ref, watch } from "vue";

import { ageChildrenValidator, maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useParentStore } from "@/stores/parentStore";

import { TPersonalDataChildrenPayload } from "../types";

const data = defineModel<TPersonalDataChildrenPayload & { isValid: boolean }>({
  required: true,
});

const props = defineProps<{ index: number }>();

const emit = defineEmits(["update-list", "validation-change", "delete-child"]);

const parentStore = useParentStore();

const isDisable = ref(true);

const { handleBlur, getErrorAttrs, isValid } = useValidation(data, emit, {
  age: { requiredValidator, maxLengthValidator: maxLengthValidator(2), ageChildrenValidator },
  id: {},
  isValid: {},
});

const onDeleteChildren = () => {
  if (data.value.id) {
    parentStore.deleteChildren(data.value.id as number).then(() => {
      emit("update-list");
    });

    return;
  }

  emit("delete-child", props.index);
};

const changeDisable = () => {
  isDisable.value = !isDisable.value;
};

watch(
  () => isValid.value,
  () => {
    data.value.isValid = isValid.value;
  },
);
</script>

<template>
  <div class="wrapper">
    <q-input
      v-bind="getErrorAttrs('age')"
      v-model.number="data.age"
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
    <q-btn padding="xs" size="xs" icon="delete" color="negative" @click="onDeleteChildren"></q-btn>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 20px;
}

.children-input {
  flex-basis: 100%;
}
</style>

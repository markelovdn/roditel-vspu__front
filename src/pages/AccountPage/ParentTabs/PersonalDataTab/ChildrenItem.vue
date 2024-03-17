<script setup lang="ts">
import { watch } from "vue";

import { ageChildrenValidator, maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useParentStore } from "@/stores/parentStore";

import { TPersonalDataChildrenPayload } from "../types";

const data = defineModel<TPersonalDataChildrenPayload & { isValid: boolean }>({
  required: true,
});

const props = defineProps<{ index: number }>();

const emit = defineEmits(["update-list", "validation-change", "delete-child"]);

const parentStore = useParentStore();

const { handleBlur, getErrorAttrs, isValid } = useValidation(data, emit, {
  age: { requiredValidator, maxLengthValidator: maxLengthValidator(2), ageChildrenValidator },
  id: {},
  isValid: {},
});

const onDeleteChildren = () => {
  if (confirm("Вы уверены, что хотите удалить ребенка?")) {
    if (data.value.id) {
      parentStore.deleteChildren(data.value.id as number).then(() => {
        emit("update-list");
      });

      return;
    }
  }

  emit("delete-child", props.index);
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
      @blur="handleBlur('age')" />
    <q-btn padding="sm" size="md" icon="delete" color="negative" @click="onDeleteChildren"></q-btn>
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

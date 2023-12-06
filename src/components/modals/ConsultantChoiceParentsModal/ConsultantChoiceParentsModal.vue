<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";
import { useConsultantStore } from "@/stores/consultantStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { TConsultantParentsPayload } from "./types";

const consultantStore = useConsultantStore();

const props = defineProps<{
  questionId: number;
}>();

const emit = defineEmits(["close"]);

const data = ref({
  parents: null as TConsultantParentsPayload | null,
});

const { getParentsList: optionsParents } = storeToRefs(consultantStore);

const { handleBlur, getErrorAttrs, isValid } = useValidation(data, emit, {
  parents: { requiredValidator },
});

const { closeModal } = useModal(emit);

const handleForm = () => {
  consultantStore.setParentQuestion(props.questionId, data.value.parents?.parentedId as number).then(() => {
    closeModal();
  });
};

onMounted(() => {
  consultantStore.getAllParents();
});
</script>

<template>
  <ModalWrapper close-button-header header="Выберите родителей" @close="closeModal">
    <div class="choice-parents">
      <q-select
        v-bind="getErrorAttrs('region_id')"
        v-model="data.parents"
        class="fit q-mb-sm"
        input-class="q-select--form"
        label="Выберите родителя из списка*"
        outlined
        :options="optionsParents"
        :option-label="(item) => item.fullName"
        emit-value
        map-options
        @blur="handleBlur('region_id')" />

      <div class="choice-parents__block">
        <q-btn
          label="Сохранить изменения"
          :disable="!isValid"
          class="q-btn--form"
          color="primary"
          @click="handleForm" />
        <q-btn label="Отменить" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" />
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.choice-parents {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__block {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>

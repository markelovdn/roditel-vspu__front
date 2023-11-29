<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { TConsultationPayload } from "@/api/Consultations/types";
import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useConsultantStore } from "@/stores/consultantStore";
import { useConsultationsStore } from "@/stores/consultationsStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close"]);

const data = ref<TConsultationPayload<number | null>>({
  consultantId: null,
  allConsultants: false,
  messageText: "",
  specializationId: null,
});

const { closeModal } = useModal(emit, data);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TConsultationPayload<number | null>>(data, emit, {
  consultantId: {},
  messageText: { requiredValidator },
  specializationId: { requiredValidator },
  allConsultants: {},
});
const collectionsStore = useCollectionsStore();
const consultantStore = useConsultantStore();
const consultationsStore = useConsultationsStore();
const { getSpecializations: optionsSpecializations } = storeToRefs(collectionsStore);
const { getConsultants: optionsConsultants } = storeToRefs(consultantStore);

const handleCreateConsultation = () => {
  consultationsStore.createConsultation(data.value);
  closeModal({ force: true });
};

onMounted(() => {
  collectionsStore.requestSpecializations();
  consultantStore.requestAllConsultants();
});
</script>

<template>
  <div>
    <ModalWrapper header="Задать вопрос">
      <q-select
        v-bind="getErrorAttrs('specializationId')"
        v-model="data.specializationId"
        input-class="q-select--form"
        label="Выберите категорию консультации*"
        outlined
        class="fit q-mb-sm"
        :options="optionsSpecializations"
        :option-label="(item) => item.label"
        emit-value
        map-options
        @blur="handleBlur('specializationId')" />

      <q-select
        v-model="data.consultantId"
        input-class="q-select--form"
        label="Выберите специалиста*"
        outlined
        class="fit q-mb-sm"
        :options="optionsConsultants"
        :option-label="(item) => item.label"
        emit-value
        map-options
        :disable="data.allConsultants || data.specializationId === null" />

      <q-checkbox
        v-model="data.allConsultants"
        :disable="data.specializationId === null"
        label="Любой специалист"
        @update:model-value="data.consultantId = null" />

      <q-input
        v-bind="getErrorAttrs('messageText')"
        v-model="data.messageText"
        autogrow
        class="q-mb-sm"
        label="Ваш вопрос*"
        :disable="data.consultantId === null && data.allConsultants === false"
        @blur="handleBlur('messageText')" />

      <div class="row no-wrap q-mt-lg">
        <q-btn
          label="Отправить"
          :disable="!isValid || (data.consultantId === null && data.allConsultants === false)"
          class="q-btn--form"
          color="primary"
          @click="handleCreateConsultation()" />
        <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

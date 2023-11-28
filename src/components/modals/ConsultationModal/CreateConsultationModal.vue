<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { TConsultationPayload } from "@/api/Consultations/types";
import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";
import { useCollectionsStore } from "@/stores/collectionsStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close", "showRegistrationModal", "showForgotPasswordModal"]);

const data = ref<TConsultationPayload>({
  title: "",
  consultantId: null,
  allConsultants: false,
  messageText: "",
  specializationId: null,
});

const { closeModal } = useModal(emit, data);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TConsultationPayload>(data, emit, {
  title: { requiredValidator },
  messageText: { requiredValidator },
});
const collectionsStore = useCollectionsStore();
const { getSpecializations: optionsSpecializations } = storeToRefs(collectionsStore);

onMounted(() => {
  collectionsStore.requestSpecializations();
});
</script>

<template>
  <div>
    <ModalWrapper header="Задать вопрос">
      <q-select
        v-bind="getErrorAttrs('specializationId')"
        v-model="data.specializationId"
        input-class="q-select--form"
        label="Специализация*"
        outlined
        class="fit q-mb-sm"
        :options="optionsSpecializations"
        :option-label="(item) => item.label"
        emit-value
        map-options
        @blur="handleBlur('specializationId')" />

      <div class="row no-wrap q-mt-lg">
        <q-btn label="Войти" :disable="!isValid" class="q-btn--form" color="primary" />
        <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

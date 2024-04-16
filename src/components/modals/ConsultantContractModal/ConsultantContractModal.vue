<script setup lang="ts">
import { ref } from "vue";

import { TContractPayload } from "@/api/Admin/types";
import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";
import { useConsultantsAdminStore } from "@/stores/adminStore/consultantsAdminStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close"]);
const props = defineProps<{
  consultantData: {
    consultantId: number;
    contractNumber: string;
  };
}>();

const data = ref<TContractPayload>({
  contractNumber: props.consultantData.contractNumber,
  consultantId: props.consultantData.consultantId,
});

const { closeModal } = useModal(emit, data);
const consultantsAdminStore = useConsultantsAdminStore();

const onContractUpdatedSuccess = () => {
  closeModal({ force: true });
};

const { handleBlur, getErrorAttrs, isValid } = useValidation<TContractPayload>(data, emit, {
  contractNumber: { requiredValidator },
  consultantId: {},
});

const handleUpdateContractNumber = () => {
  consultantsAdminStore
    .updateContractNumber(data.value.consultantId, data.value.contractNumber)
    .then(onContractUpdatedSuccess);
};
</script>

<template>
  <ModalWrapper header="Номер договора">
    <q-form class="fit q-mb-sm form" @keydown.enter="handleUpdateContractNumber">
      <q-input
        v-bind="getErrorAttrs('contractNumber')"
        v-model="data.contractNumber"
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Номер договора*"
        borderless
        @blur="handleBlur('email')" />
    </q-form>
    <div class="row no-wrap q-mt-lg q-mb-mb">
      <q-btn
        label="Сохранить"
        :disable="!isValid"
        class="q-btn--form"
        color="primary"
        @click="handleUpdateContractNumber" />
      <q-btn label="Закрыть" class="q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

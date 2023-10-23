<script setup lang="ts">
import { ref } from "vue";

import { type TQuestionnairePayload } from "@/api/Questionnaires/types";
import { useModal } from "@/hooks/useModal";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import CreateForm from "./CreateForm.vue";

const emit = defineEmits(["close"]);

const data = ref<TQuestionnairePayload>({
  title: "",
});

const { closeModal } = useModal(emit, data);
const isRoleSelected = ref(false);
const setRole = (role_code: string) => {
  data.value.role_code = role_code;
  isRoleSelected.value = true;
};

const isValid = ref(false);

//TODO: добавить тип нормальный вместо any
const handleValidChange = (eventPayload: any) => {
  isValid.value = eventPayload.isValid;
};
</script>

<template>
  <ModalWrapper
    header="Добавить данные"
    sub-header="Введите свои данные для регистрации"
    :close-button-header="!isRoleSelected"
    @close="closeModal">

    <CreateForm v-model="data" @validation-change="handleValidChange" />

    <div v-if="isRoleSelected" class="row no-wrap q-mt-lg">
      <q-btn
        label="Отправить"
        :disable="!isValid"
        class="q-btn--form"
        color="primary"
        @click="handleRegistration"></q-btn>
      <q-btn
        label="Закрыть"
        :align="'right'"
        class="q-ml-sm q-btn--form"
        flat
        :ripple="false"
        color="grey-1"
        @click="closeModal()" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

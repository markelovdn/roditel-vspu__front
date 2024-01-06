<script setup lang="ts">
import { computedEager } from "@vueuse/core";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { type TRegistrationPayload } from "@/api/Auth/types";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/stores/authStore";
import notify from "@/utils/notify";
import { omit } from "@/utils/objectHelpers";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import ConsultantForm from "./ConsultantForm.vue";
import ParentedForm from "./ParentedForm.vue";
import { RegistrationRoleMap } from "./types";

const emit = defineEmits(["close", "close-common-modal"]);
const router = useRouter();
const route = useRoute();

const data = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  specializationId: null,
  professionId: null,
  password: "",
  passwordConfirm: "",
  roleCode: "",
  regionId: null,
});

const { closeModal } = useModal(emit, data);
const authStore = useAuthStore();
const isRoleSelected = ref(false);
const setRole = (roleCode: string) => {
  data.value.roleCode = roleCode;
  isRoleSelected.value = true;
};
const isConsultant = computedEager(() => data.value.roleCode === RegistrationRoleMap.CONSULTANT);
const isValid = ref(false);

//TODO: добавить тип нормальный вместо any
const handleValidChange = (eventPayload: any) => {
  isValid.value = eventPayload.isValid;
};

const closeCommonModal = () => {
  closeModal({ force: true });
  emit("close-common-modal");
};
const onRegisterSuccess = () => {
  router.push({ name: "My", query: { ...route.query } });
  closeModal({ force: true });
};
const onRegisterFail = () => notify({ type: "negative", message: "Не удалось зарегистрироваться" });
const handleRegistration = async () => {
  authStore
    .registration(omit(data.value, "passwordConfirm") as TRegistrationPayload)
    .then(onRegisterSuccess, onRegisterFail);
};
</script>

<template>
  <ModalWrapper
    header="Добавить данные"
    sub-header="Введите свои данные для регистрации"
    :close-button-header="!isRoleSelected"
    @close="closeCommonModal()">
    <template v-if="!isRoleSelected" #subHeader>
      <div class="row no-wrap q-mt-lg">
        <q-btn
          label="Я консультант"
          class="q-btn--form z-max"
          color="primary"
          @click="setRole(RegistrationRoleMap.CONSULTANT)" />
        <q-btn
          label="Я родитель"
          class="q-ml-sm q-btn--form z-max"
          color="primary"
          @click="setRole(RegistrationRoleMap.PARENTED)" />
      </div>
    </template>

    <ConsultantForm v-if="isRoleSelected && isConsultant" v-model="data" @validation-change="handleValidChange" />

    <ParentedForm v-if="isRoleSelected && !isConsultant" v-model="data" @validation-change="handleValidChange" />

    <div v-if="isRoleSelected" class="row no-wrap q-mt-lg">
      <q-btn
        label="Регистрация"
        :disable="!isValid"
        class="q-btn--form"
        color="primary"
        @click="handleRegistration"></q-btn>
      <q-btn
        label="Закрыть"
        class="q-ml-sm q-btn--form"
        flat
        :ripple="false"
        color="grey-1"
        @click="closeCommonModal()" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

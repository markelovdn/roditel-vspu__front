<script setup lang="ts">
import { ref } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import ConsultantForm from "./ConsultantForm.vue";
import ParentedForm from "./ParentedForm.vue";
import { RegistrationRoleMap } from "./types";
import { type TRegistrationPayload } from "@/api/Auth/types";
import { useModal } from "@/hooks/useModal";
import { computedEager } from "@vueuse/core";
import { useAuthStore } from "@/stores/authStore";
import { omit } from "@/utils/objectHelpers";

const emit = defineEmits(["close"]);

const data = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  specializationId: null,
  professionId: null,
  password: "",
  passwordConfirm: "",
  role_code: "",
  region_id: null,
});

const { closeModal } = useModal(emit, data);
const authStore = useAuthStore();
const isRoleSelected = ref(false);
const setRole = (role_code: string) => {
  data.value.role_code = role_code;
  isRoleSelected.value = true;
};
const isConsultant = computedEager(() => data.value.role_code === RegistrationRoleMap.CONSULTANT);
const isValid = ref(false);

//TODO: добавить тип нормальный вместо any
const handleValidChange = (eventPayload: any) => {
  isValid.value = eventPayload.isValid;
};
const handleRegistration = () => {
  authStore.registration(omit(data.value, "passwordConfirm") as TRegistrationPayload);
};
</script>

<template>
  <ModalWrapper
    header="Добавить данные"
    subHeader="Введите свои данные для регистрации"
    :closeButtonHeader="!isRoleSelected"
    @close="closeModal">
    <template v-if="!isRoleSelected" v-slot:subHeader>
      <div class="fit q-mb-sm">
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

    <div v-if="isRoleSelected" class="fit q-mb-sm footer">
      <q-btn
        label="Регистрация"
        :disable="!isValid"
        class="q-btn--form"
        color="primary"
        @click="handleRegistration"></q-btn>
      <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import ConsultantForm from "./ConsultantForm.vue";
import ParentedForm from "./ParentedForm.vue";
import { type TRegistrationPayload, RegistrationRoleMap } from "./types";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import { computedEager } from "@vueuse/core";

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
  region: "",
});

const { closeModal } = useModal(emit, data);

const isRoleSelected = ref(false);
const setRole = (role_code: string) => {
  data.value.role_code = role_code;
  isRoleSelected.value = true;
};
const isConsultant = computedEager(() => data.value.role_code === RegistrationRoleMap.CONSULTANT);
const isValid = ref(false);
const sendData = async (data: TRegistrationPayload) => {
  const splitName: Array<any> = data.name.split(" ");

  await axios
    .post("https://markelovdn.ru/api/register", {
      first_name: splitName[0],
      second_name: splitName[1],
      patronymic: splitName[2],
      phone: data.phone,
      email: data.email,
      specialization_id: data.specializationId,
      profession_id: data.professionId,
      password: data.password,
      role_id: 1,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      // console.log(response.data);
    })
    .catch((errors) => {
      console.log(errors);
    });
};
//TODO: добавить тип нормальный вместо any
const handleValidChange = (eventPayload: any) => {
  isValid.value = eventPayload.isValid;
};
</script>

<template>
  <ModalWrapper header="Добавить данные" subHeader="Введите свои данные для регистрации">
    <template v-if="!isRoleSelected" v-slot:subHeader>
      <div class="fit q-mb-sm">
        <q-btn
          label="Я консультант"
          class="q-btn--form"
          color="primary"
          @click="setRole(RegistrationRoleMap.CONSULTANT)" />
        <q-btn
          label="Я родитель"
          class="q-ml-sm q-btn--form"
          color="primary"
          @click="setRole(RegistrationRoleMap.PARENTED)" />
      </div>
    </template>

    <ConsultantForm v-if="isRoleSelected && isConsultant" v-model="data" @validation-change="handleValidChange" />

    <ParentedForm v-if="isRoleSelected && !isConsultant" v-model="data" @validation-change="handleValidChange" />

    <div v-if="isRoleSelected" class="fit q-mb-sm footer">
      <q-btn label="Регистрация" :disable="!isValid" class="q-btn--form" color="primary" @click="sendData(data)" />

      <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>

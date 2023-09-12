<script setup lang="ts">
import { ref, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import ConsultantFormVue from "./ConsultantForm.vue";
import ParentedFormVue from "./ParentedForm.vue";
import type { TRegistrationPayload } from "./types";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import { CONSULTANT, PARENTED} from '@/components/modals/RegistrationModal/constants'

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits<{
  (event: "update:show-modal" | string, value: boolean): void;
}>();

const data = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  specializationId: null,
  professionId: null,
  password: "",
  role_code: "",
  region: ""
});

const isShow = computed(() => props.showModal);
const { isModalShown } = useModal(isShow, emit, data);

const whoAmI = ref(true);
const isConsultant = ref(false);
const isParented = ref(false);
const setRole = (role_code: string) => {
  whoAmI.value = false;
  data.value.role_code = role_code;
  role_code === CONSULTANT ? isConsultant.value = true : isParented.value = true; 
}

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
</script>

<template>
  <ModalWrapper
    v-model:show-modal="isModalShown"
    header="Добавить данные"
    subHeader="Введите свои данные для регистрации">

    <template v-if="whoAmI" v-slot:subHeader>
      <div class="fit q-mb-sm">
      <q-btn label="Я консультант" class="q-btn--form" color="primary" @click="setRole(CONSULTANT)" />
      <q-btn label="Я родитель" class="q-ml-sm q-btn--form" color="primary" @click="setRole(PARENTED)" />
    </div>
    </template>
    
    <ConsultantFormVue v-if="!whoAmI && isConsultant" :role="CONSULTANT"/>

    <ParentedFormVue v-if="!whoAmI && isParented" :role="PARENTED"/>

    <div v-if="!whoAmI" class="fit q-mb-sm footer">
      <q-btn label="Регистрация" :disable="hasError" class="q-btn--form" color="primary" @click="sendData(data)" />

      <q-btn
        label="Закрыть"
        class="q-ml-sm q-btn--form"
        flat
        :ripple="false"
        color="grey-1"
        @click="isModalShown = false" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>

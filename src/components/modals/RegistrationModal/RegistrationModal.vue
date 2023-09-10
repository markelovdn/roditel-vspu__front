<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import type { TSelectItems, TRegistrationPayload } from "./types";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import { useValidation, requiredValidator } from "@/hooks/useValidation";

let optionsSpecializations = ref<TSelectItems[] | undefined>();
let optionsProfessions = ref<TSelectItems[] | undefined>();

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits<{
  (event: "update:show-modal" | string, value: boolean): void;
}>();

const getSpecializations = async () => {
  await axios
    .get("https://markelovdn.ru/api/specializations", {})
    .then((response) => {
      optionsSpecializations.value = response.data.data.map((item: TSelectItems) => {
        return { label: item.title, value: item.id };
      });
      console.log(optionsSpecializations);
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const getProfessions = async () => {
  await axios
    .get("https://markelovdn.ru/api/professions", {})
    .then((response) => {
      optionsProfessions.value = response.data.data.map((item: TSelectItems) => {
        return { label: item.title, value: item.id };
      });
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const isPwd = ref(true);
const passwordConfirm = ref<string>("");

const data = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  specializationId: null,
  professionId: null,
  password: "",
});

const isShow = computed(() => props.showModal);
const { isModalShown } = useModal(isShow, emit, data);
const { hasError, handleBlur, $v, getErrorAttrs } = useValidation<TRegistrationPayload>(data, {
  name: { requiredValidator },
  phone: { requiredValidator },
  email: { requiredValidator },
  specializationId: { requiredValidator },
  professionId: { requiredValidator },
  password: { requiredValidator },
});
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

onMounted(async () => {
  getSpecializations();
  getProfessions();
});
</script>

<template>
  <ModalWrapper
    v-model:show-modal="isModalShown"
    header="Добавить данные"
    subHeader="Введите свои данные для регистрации">
    <q-form class="fit q-mb-sm form">
      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Ф.И.О.*"
        borderless
        color="primary"
        v-bind="getErrorAttrs('name')"
        @blur="handleBlur('name')"
        v-model="data.name" />

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Телефон*"
        mask="+7 (###) ### ####"
        borderless
        v-bind="getErrorAttrs('phone')"
        @blur="handleBlur('phone')"
        v-model="data.phone" />

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Почта*"
        borderless
        v-bind="getErrorAttrs('email')"
        @blur="handleBlur('email')"
        v-model="data.email" />

      <q-select
        input-class="q-select--form"
        label="Специализация*"
        outlined
        class="fit q-mb-sm"
        :options="optionsSpecializations"
        :option-label="(item) => item.label"
        emit-value
        map-options
        v-bind="getErrorAttrs('specializationId')"
        @blur="handleBlur('specializationId')"
        v-model="data.specializationId" />

      <q-select
        class="fit q-mb-sm"
        input-class="q-select--form"
        label="Кем Вы являетесь*"
        outlined
        :options="optionsProfessions"
        :option-label="(item) => item.label"
        emit-value
        map-options
        v-bind="getErrorAttrs('professionId')"
        @blur="handleBlur('professionId')"
        v-model="data.professionId" />

      <q-input
        outlined
        class="fit q-mb-sm"
        label="Пароль*"
        v-bind="getErrorAttrs('password')"
        @blur="handleBlur('password')"
        aria-autocomplete="new-password"
        v-model="data.password"
        :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        label="Подтвердите пароль*"
        v-model="passwordConfirm"
        v-bind="getErrorAttrs('passwordConfirm')"
        @blur="handleBlur('passwordConfirm')"
        aria-autocomplete="new-password"
        :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
    </q-form>

    <div class="fit q-mb-sm footer">
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

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "@/common/axios";
import { type TSelectItems, type TRegistrationPayload } from "./types";
import {
  useValidation,
  requiredValidator,
  splitNameValidator,
  emailValidator,
  minLengthValidator,
  repeatPasswordValidator,
} from "@/hooks/useValidation";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TRegistrationPayload;
}>();
let optionsSpecializations = ref<TSelectItems[] | undefined>();
let optionsProfessions = ref<TSelectItems[] | undefined>();
const data = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:model-value", e);
  },
});
const isPwd = ref(true);

const { handleBlur, $v, getErrorAttrs } = useValidation<TRegistrationPayload>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  specializationId: { requiredValidator },
  professionId: { requiredValidator },
  password: { requiredValidator },
  passwordConfirm: { repeatPasswordValidator: repeatPasswordValidator(computed(() => data.value.password)) },
  role_code: { requiredValidator },
});

//TODO: вынести в store и в api сервисы
const getSpecializations = async () => {
  await axios
    .get("/api/specializations", {})
    .then((response) => {
      optionsSpecializations.value = response.data.data.map((item: TSelectItems) => {
        console.log(response)
        return { label: item.title, value: item.id };
      });
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const getProfessions = async () => {
  await axios
    .get("/api/professions", {})
    .then((response) => {
      optionsProfessions.value = response.data.data.map((item: TSelectItems) => {
        return { label: item.title, value: item.id };
      });
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
      v-model="data.passwordConfirm"
      v-bind="getErrorAttrs('passwordConfirm')"
      @blur="handleBlur('passwordConfirm')"
      aria-autocomplete="new-password"
      :type="isPwd ? 'password' : 'text'">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
  </q-form>
</template>

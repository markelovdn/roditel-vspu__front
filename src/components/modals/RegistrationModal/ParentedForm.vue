<script setup lang="ts">
import { computed, ref } from "vue";
import { type TRegistrationPayload } from "./types";
import {
  useValidation,
  requiredValidator,
  splitNameValidator,
  emailValidator,
  minLengthValidator,
} from "@/hooks/useValidation";
import { watchDebounced } from "@vueuse/core";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TRegistrationPayload;
}>();

let regions = ref<string[] | undefined>(["Москва", "Санкт-Петербург", "Волгоград"]);
const isPwd = ref(true);
const passwordConfirm = ref<string>("");
const data = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:model-value", e);
  },
});
const { handleBlur, getErrorAttrs } = useValidation<TRegistrationPayload>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  password: { requiredValidator },
  region: { requiredValidator },
  role_code: { requiredValidator },
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
      class="fit q-mb-sm"
      input-class="q-select--form"
      label="Регион*"
      outlined
      :options="regions"
      :option-label="(item) => item"
      emit-value
      map-options
      v-bind="getErrorAttrs('region')"
      @blur="handleBlur('region')"
      v-model="data.region" />

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
</template>

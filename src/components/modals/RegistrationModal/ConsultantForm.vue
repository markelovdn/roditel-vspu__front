<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { TRegistrationPayload } from "@/api/Auth/types";
import {
  emailValidator,
  minLengthValidator,
  repeatPasswordValidator,
  requiredValidator,
  splitNameValidator,
  useValidation,
} from "@/hooks/useValidation";
import { useCollectionsStore } from "@/stores/collectionsStore";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TRegistrationPayload;
}>();

const collectionsStore = useCollectionsStore();
const { getSpecializations: optionsSpecializations, getProfessions: optionsProfessions } =
  storeToRefs(collectionsStore);
const data = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:model-value", e);
  },
});
const isPwd = ref(true);

const { handleBlur, getErrorAttrs } = useValidation<TRegistrationPayload>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  specializationId: { requiredValidator },
  professionId: { requiredValidator },
  password: { requiredValidator },
  passwordConfirm: { repeatPasswordValidator: repeatPasswordValidator(computed(() => data.value.password)) },
  role_code: { requiredValidator },
});

onMounted(() => {
  collectionsStore.requestSpecializations();
  collectionsStore.requestProfessions();
});
</script>

<template>
  <q-form class="fit q-mb-sm form">
    <q-input
      v-bind="getErrorAttrs('name')"
      v-model="data.name"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Ф.И.О.*"
      borderless
      color="primary"
      @blur="handleBlur('name')" />

    <q-input
      v-bind="getErrorAttrs('phone')"
      v-model="data.phone"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Телефон*"
      mask="+# (###) ### ####"
      borderless
      @blur="handleBlur('phone')" />

    <q-input
      v-bind="getErrorAttrs('email')"
      v-model="data.email"
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Почта*"
      borderless
      @blur="handleBlur('email')" />

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

    <q-select
      v-bind="getErrorAttrs('professionId')"
      v-model="data.professionId"
      class="fit q-mb-sm"
      input-class="q-select--form"
      label="Кем Вы являетесь*"
      outlined
      :options="optionsProfessions"
      :option-label="(item) => item.label"
      emit-value
      map-options
      @blur="handleBlur('professionId')" />

    <q-input
      v-bind="getErrorAttrs('password')"
      v-model="data.password"
      outlined
      class="fit q-mb-sm"
      label="Пароль*"
      aria-autocomplete="new-password"
      :type="isPwd ? 'password' : 'text'"
      @blur="handleBlur('password')">
      <template #append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-input
      v-model="data.passwordConfirm"
      outlined
      class="fit q-mb-sm"
      label="Подтвердите пароль*"
      v-bind="getErrorAttrs('passwordConfirm')"
      aria-autocomplete="new-password"
      :type="isPwd ? 'password' : 'text'"
      @blur="handleBlur('passwordConfirm')">
      <template #append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
  </q-form>
</template>

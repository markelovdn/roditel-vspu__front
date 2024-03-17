<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { TRegistrationPayload } from "@/api/Auth/types";
import { useFilteredOptions } from "@/hooks/useFilteredOptions";
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
const { getRegions: optionsRegions } = storeToRefs(collectionsStore);

const { filteredOptions, onFilter } = useFilteredOptions(optionsRegions);

const isPwd = ref(true);

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
  passwordConfirm: { repeatPasswordValidator: repeatPasswordValidator(computed(() => data.value.password)) },
  password: { requiredValidator },
  regionId: { requiredValidator },
  roleCode: { requiredValidator },
});

onMounted(async () => {
  collectionsStore.requestRegions();
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
      mask="+7 (###) ### ####"
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
      v-bind="getErrorAttrs('regionId')"
      v-model="data.regionId"
      class="fit q-mb-sm"
      input-class="q-select--form"
      label="Регион*"
      outlined
      :options="filteredOptions"
      :option-label="(item) => item.label"
      emit-value
      map-options
      input-debounce="500"
      use-input
      @blur="handleBlur('regionId')"
      @filter="onFilter" />

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
@/stores/commonStore@/stores/collectionsStore

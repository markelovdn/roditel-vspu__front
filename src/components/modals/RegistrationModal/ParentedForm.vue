<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { type TSelectItems } from "./types";
import { type TRegistrationPayload } from "@/api/Auth/types";
import { type TCollectionsItem } from "@/api/Collections/types";
import { useCollectionsStore } from "@/stores/collectionsStore";
import {
  useValidation,
  requiredValidator,
  splitNameValidator,
  emailValidator,
  minLengthValidator,
  repeatPasswordValidator,
} from "@/hooks/useValidation";
import { watchDebounced } from "@vueuse/core";

const emit = defineEmits(["validation-change", "update:model-value"]);
const props = defineProps<{
  modelValue: TRegistrationPayload;
}>();

let optionsRegions = ref<TSelectItems[]>();

const getRegions = (regions: TCollectionsItem[]) => {
  optionsRegions.value = regions.map((item) => {
    return { label: item.title, value: item.id };
  });
};

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
  region_id: { requiredValidator },
  role_code: { requiredValidator },
});

onMounted(async () => {
  getRegions(await useCollectionsStore().regions);
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
      :options="optionsRegions"
      :option-label="(item) => item.label"
      emit-value
      map-options
      v-bind="getErrorAttrs('region_id')"
      @blur="handleBlur('region_id')"
      v-model="data.region_id" />

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
@/stores/commonStore@/stores/collectionsStore
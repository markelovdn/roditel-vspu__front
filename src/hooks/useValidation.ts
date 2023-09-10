import useVuelidate, { type ValidationArgs } from "@vuelidate/core";

import { computedEager } from "@vueuse/core";
import { computed, type Ref } from "vue";
import { email, helpers, minLength, required } from "@vuelidate/validators";

export type TRule<T> = ValidationArgs<T>;

export const requiredValidator = helpers.withMessage("Обязательное поле", required);
export const emailValidator = helpers.withMessage("Не верный формат email адреса", email);
export const minLengthValidator = (length: number) => helpers.withMessage(`Не верная длина номера`, minLength(length))
export const splitNameValidator =  helpers.withMessage(`ФИО должно состоять из трех слов`, (value: string) => value.trim().split(' ').length >= 3);

export function useValidation<T extends {}>(data: Ref<T>, rules: TRule<T>) {
  const getRules = computed(() => rules);
  const $v = useVuelidate<T>(getRules, data);
  const handleBlur = (key: string) => {
    const property = $v.value[key];
    if (property) property.$dirty = true;
  };
  const hasError = computedEager(() => $v.value.$errors.length > 0);
  const getErrorAttrs = (key: string) => {
    return {
      error: $v.value[key]?.$error,
      "error-message": $v.value[key]?.$errors[0]?.$message,
    };
  };
  return { hasError, $v, handleBlur, getErrorAttrs };
}

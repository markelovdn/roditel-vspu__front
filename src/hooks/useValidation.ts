import useVuelidate, { type ValidationArgs } from "@vuelidate/core";

import { computedEager } from "@vueuse/core";
import { computed, watch, type Ref, type ComputedRef } from "vue";
import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators";
import type { GenericEmit } from "@/types";

export type TRule<T> = ValidationArgs<T>;

export const requiredValidator = helpers.withMessage("Обязательное поле", required);
export const emailValidator = helpers.withMessage("Не верный формат email адреса", email);
export const minLengthValidator = (length: number) => helpers.withMessage(`Не верная длина номера`, minLength(length));
export const repeatPasswordValidator = (password: Ref<string> | ComputedRef<string>) =>
  helpers.withMessage("Пароли не совпадают", sameAs(password));
export const splitNameValidator = helpers.withMessage(
  `ФИО должно состоять из трех слов`,
  (value: string) => value.trim().split(" ").length >= 3,
);

export function useValidation<T extends {}>(data: Ref<T>, emit: GenericEmit, rules: TRule<T>) {
  const getRules = computed(() => rules);
  const $v = useVuelidate<T>(getRules, data);

  const handleBlur = (key: string) => {
    const property = $v.value[key];
    if (property) property.$dirty = true;
  };

  const isValid = computedEager(() => $v.value.$silentErrors.length <= 0 && $v.value.$errors.length <= 0);
  const getErrorAttrs = (key: string) => {
    return {
      error: $v.value[key]?.$error,
      "error-message": $v.value[key]?.$errors[0]?.$message,
    };
  };
  watch(
    isValid,
    () => {
      emit("validation-change", { isValid: isValid.value });
    },
    { immediate: true },
  );
  return { isValid, $v, handleBlur, getErrorAttrs };
}

import useVuelidate, { type ValidationArgs } from "@vuelidate/core";
import { email, helpers, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import { computedEager } from "@vueuse/core";
import { computed, type ComputedRef, type Ref, watch } from "vue";

import type { GenericEmit } from "@/types";

export type TRule<T> = ValidationArgs<T>;

export const requiredValidator = helpers.withMessage("Обязательное поле", required);
export const emailValidator = helpers.withMessage("Не верный формат email адреса", email);
export const minLengthValidator = (length: number) =>
  helpers.withMessage(`Количество символов должно быть не менее ${length}`, minLength(length));
export const maxLengthValidator = (length: number) =>
  helpers.withMessage(`Длина строки не должна превышать ${length} символов`, maxLength(length));
export const repeatPasswordValidator = (password: Ref<string> | ComputedRef<string>) =>
  helpers.withMessage("Пароли не совпадают", sameAs(password));
export const splitNameValidator = helpers.withMessage(
  `ФИО должно состоять из трех слов`,
  (value: string) => value.trim().split(" ").length >= 3,
);
export const isNotZero = helpers.withMessage(`Пожалуйста дайте свою оценку`, (value: number) => value !== 0);

export function useValidation<T extends {}>(data: Ref<T>, emit: GenericEmit, rules: TRule<T>) {
  const getRules = computed(() => rules);
  const $v = useVuelidate<T>(getRules, data);

  const handleBlur = (key: string) => {
    const property = $v.value[key];
    if (property) property.$dirty = true;
  };

  const isValid = computedEager(() => $v.value.$silentErrors.length <= 0 && $v.value.$errors.length <= 0);
  const getErrorAttrs = (collectionKey: string, eachKey?: string, index?: number) => {
    if (eachKey && index !== undefined) {
      return {
        error: $v.value[collectionKey]?.$each.$response.$errors[index]?.[eachKey]?.length > 0,
        "error-message": $v.value[collectionKey]?.$each.$response.$errors[index]?.[eachKey]?.[0]?.$message,
      };
    }
    return {
      error: $v.value[collectionKey]?.$error,
      "error-message": $v.value[collectionKey]?.$errors[0]?.$message,
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

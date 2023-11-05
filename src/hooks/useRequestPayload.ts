import cloneDeep from "lodash.clonedeep";
import { onMounted, reactive, Ref, ref, toRefs, toValue, watch } from "vue";

import { ParamsType, useParamBuilder } from "./useParamBuilder ";

export const useRequestPayload = <T extends Record<string, unknown>>(
  // Фильтры, query params
  data: Ref<T>,
  callback: (...args: any) => any,
  options: {
    watchParams?: Array<keyof T>;
    clearableParams?: Array<keyof T>;
  },
) => {
  options;
  const initialParams = ref<T>();
  const result = ref();
  const state = reactive({
    isLoading: false,
    error: null as any,
  });

  const triggerCallback = () => {
    //TODO: сомневаюсь, что колбэк всегда будет возвращать что-то
    return callback(useParamBuilder(data.value as ParamsType));
  };

  const reload = async () => {
    state.isLoading = true;
    try {
      result.value = triggerCallback();
    } catch (e) {
      state.error = e;
    } finally {
      state.isLoading = false;
    }
  };

  watch(
    () => cloneDeep(data),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (newValue, oldValue) => {
      // newValue;
      // oldValue;
      reload();
      // тут будет код сброса параметров
    },
    { immediate: true, deep: true },
  );

  onMounted(() => {
    triggerCallback();
    initialParams.value = cloneDeep(toValue(data));
  });

  return {
    ...toRefs(state),
    result,
    reload,
  };
};

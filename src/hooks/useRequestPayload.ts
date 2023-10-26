import cloneDeep from "lodash.clonedeep";
import { isRef, onMounted, reactive, Ref, ref, toRefs, unref, watch } from "vue";

import { TWebinarsRequestOption } from "@/api/Webinars/types";

import { useParamBuilder } from "./useParamBuilder ";

export const useRequestPayload = (
  data: TWebinarsRequestOption | Ref<TWebinarsRequestOption>,
  callback: (payload: Ref<string> | string | URLSearchParams) => any,
  options: {
    watchParams?: Array<keyof TWebinarsRequestOption>;
    clearableParams?: TWebinarsRequestOption;
  } = { clearableParams: { page: 1 } },
) => {
  options;
  const queryParams = ref<TWebinarsRequestOption>({});
  const result = ref();
  const state = reactive({
    isLoading: false,
    error: null as any,
  });

  const reload = async () => {
    state.isLoading = true;
    try {
      result.value = callback(useParamBuilder(data));
    } catch (e) {
      state.error = e;
    } finally {
      state.isLoading = false;
    }
  };

  if (isRef(data)) {
    watch(
      () => cloneDeep(data),
      (newValue, oldValue) => {
        newValue;
        oldValue;
        reload();
        // тут будет код сброса параметров
      },
      { immediate: true, deep: true },
    );
  }
  onMounted(() => {
    queryParams.value = cloneDeep(unref(data));
  });

  return {
    ...toRefs(state),
    result,
    reload,
  };
};

import cloneDeep from "lodash.clonedeep";
import { Ref, watch } from "vue";

import { TWebinarsRequestOption } from "@/api/Webinars/types";
// by convention, composable function names start with "use"
export function useRequestPayload(
  payload: Ref<TWebinarsRequestOption>,
  callback: any,
  options: {
    watchParams?: Array<keyof TWebinarsRequestOption>;
    clearableParams?: Array<keyof TWebinarsRequestOption>;
  } = {},
) {
  watch(
    () => cloneDeep(payload),
    (newPayload, oldPayload) => {
      const modifiedPayload = newPayload.value;

      if (newPayload.value.page === oldPayload.value.page && options.clearableParams) {
        options.clearableParams.forEach((key) => delete modifiedPayload[key]); // удаляем все clearableParams из payload
      }

      if (!options.watchParams) {
        callback(modifiedPayload); // делаем запрос, если нету доп параметров, а payload изменился
      } else {
        if (isEqual(newPayload, oldPayload, options.watchParams)) {
          callback(modifiedPayload); //Отправляем если изменились параметры из watchParams
        }
      }
    },
    { deep: true },
  );

  return {};
}

const isEqual = (newValue: any, oldValue: any, comparisonsKeys: string[]) => {
  for (const key of Object.keys(newValue)) {
    if (oldValue[key] !== newValue[key] && comparisonsKeys.includes(key)) {
      return false;
    }
  }
  return true;
};

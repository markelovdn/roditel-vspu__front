import { watchOnce } from "@vueuse/core";
import { type Ref, ref } from "vue";

import useAlert from "@/hooks/useAlert";
import type { GenericEmit } from "@/types";

export function useModal(emit: GenericEmit, data: Ref<unknown> = ref({})) {
  const hasChanges = ref(false);
  const forceClose = ref(false);

  watchOnce(
    data,
    () => {
      hasChanges.value = true;
    },
    { deep: true },
  );

  const alert = useAlert();
  const closeModal = (options = { force: false }) => {
    if (hasChanges.value && !forceClose.value && !options.force) {
      alert({
        confirm: () => {
          forceClose.value = true;
          closeModal();
        },
        cancel: () => void 0,
      });
    } else {
      setTimeout(() => {
        forceClose.value = false;
        emit("close");
      }, 100);
    }
  };
  //TODO: добавить закрытие по клавише Escape
  // const onEscape = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") hide();
  // };

  //     document.addEventListener("keydown", onEscape);
  // onBeforeUnmount(() => {
  // 	document.removeEventListener("keydown", onEscape);
  // });
  return { closeModal };
}

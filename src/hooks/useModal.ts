import type { GenericEmit } from "@/types";
import { watchOnce } from "@vueuse/core";
import { computed, type ComputedRef, type Ref, ref } from "vue";
import useAlert from "@/hooks/useAlert";

export function useModal(showProp: ComputedRef<boolean>, emit: GenericEmit, data: Ref<unknown> = ref({})) {
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
  const closeModal = (callback?: () => void) => {
    if (hasChanges.value && !forceClose.value) {
      alert({
        confirm: () => {
          forceClose.value = true;
          closeModal(callback);
        },
        cancel: () => void 0,
      });
    } else {
      setTimeout(() => {
        forceClose.value = false;
        callback?.();
        emit("update:show-modal", false);
      }, 100);
    }
  };

  // const onEscape = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") hide();
  // };

  //     document.addEventListener("keydown", onEscape);
  // onBeforeUnmount(() => {
  // 	document.removeEventListener("keydown", onEscape);
  // });

  const onShowTriggered = (v: boolean) => {
    if (v === true) {
      emit("update:show-modal", true);
    } else {
      closeModal();
    }
  };

  const isModalShown = computed({
    get() {
      return showProp.value;
    },
    set(v: boolean) {
      onShowTriggered(v);
    },
  });
  return { isModalShown };
}

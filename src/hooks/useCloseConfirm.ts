import { watchOnce } from "@vueuse/core";
import { type Ref, ref } from "vue";
import { useRouter } from "vue-router";

import useAlert from "@/hooks/useAlert";

export function useCloseConfirm(data: Ref<unknown> = ref({})) {
  const hasChanges = ref(false);
  const forceClose = ref(false);
  const router = useRouter();

  watchOnce(
    data,
    () => {
      hasChanges.value = true;
    },
    { deep: true },
  );

  const alert = useAlert();
  const confirmCancel = (options = { force: false }) => {
    if (hasChanges.value && !forceClose.value && !options.force) {
      alert({
        confirm: () => {
          forceClose.value = true;
          confirmCancel();
          router.push({ name: "My", query: { tabId: "webinars" } });
        },
        cancel: () => void 0,
      });
      console.log("hasChanges");
    } else {
      setTimeout(() => {
        forceClose.value = false;
        router.push({ name: "My", query: { tabId: "webinars" } });
      }, 100);
      console.log("noChanges");
    }
  };

  return { confirmCancel };
}

import { watchOnce } from "@vueuse/core";
import { type Ref, ref } from "vue";
import { useRouter } from "vue-router";

import useAlert from "@/hooks/useAlert";

export function useCloseConfirm(data: Ref<unknown> = ref({}), routerName: string, queryParams: Record<string, any>) {
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
          router.push({ name: routerName, query: queryParams });
        },
        cancel: () => void 0,
      });
    } else {
      setTimeout(() => {
        forceClose.value = false;
        router.push({ name: routerName, query: queryParams });
      }, 100);
    }
  };

  return { confirmCancel };
}

import { watchOnce } from "@vueuse/core";
import { type Ref, ref } from "vue";

import useAlert from "@/hooks/useAlert";
import router from "@/router/index";
import { useAuthStore } from "@/stores/authStore";
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

export function useToQuestions(showLoginModal: Ref<boolean>) {
  const authStore = useAuthStore();
  if (authStore.user?.role.title !== "Консультант") {
    router.push({ name: "My", query: { isOpenNewConsultation: "true", tabId: "questions" } });
  } else {
    router.push({ name: "My", query: { tabId: "applications" } });
  }

  if (!authStore.getUserInfo) {
    router.push({ query: { isOpenNewConsultation: "true", tabId: "questions" } });
    showLoginModal.value = true;
  }
}
export function useCreateQuestion(showModal: Ref<boolean>, showLoginModal: Ref<boolean>, consultant: any) {
  const authStore = useAuthStore();
  consultant;
  if (!authStore.getUserInfo) {
    router.push({ query: { isOpenNewConsultation: "true", tabId: "questions" } });
    showLoginModal.value = true;
    return;
  }
  showModal.value = true;
  if (authStore.user?.role.title !== "Консультант") {
    router.push({ name: "My", query: { isOpenNewConsultation: "true", tabId: "questions" } });
  } else {
    router.push({ name: "My", query: { tabId: "applications" } });
  }
}

export function useToOldWebinars(showLoginModal: Ref<boolean>) {
  const authStore = useAuthStore();
  if (authStore.user?.role.title === "Консультант") {
    alert("Вы консультант, зайдите под учёткой родителя");
    return;
  }
  router.push({ name: "My", query: { actual: "no", tabId: "webinars" } });
  if (!authStore.getUserInfo) {
    showLoginModal.value = true;
  }
}

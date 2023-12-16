import { watchOnce } from "@vueuse/core";
import { provide, type Ref, ref } from "vue";

import useAlert from "@/hooks/useAlert";
import router from "@/router/index";
import { useAuthStore } from "@/stores/authStore";
import type { GenericEmit } from "@/types";
import { AuthModalInjectionKey } from "@/utils/injectionKeys";

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
export function useAuthModal() {
  const authStore = useAuthStore();
  const isLoginModalShowing = ref(false);
  const isRegistrationModalShowing = ref(false);
  const isForgotPasswordModalShowing = ref(false);
  const showLoginModal = () => (isLoginModalShowing.value = true);
  const showRegistrationModal = () => (isRegistrationModalShowing.value = true);
  const showForgotPasswordModal = () => (isForgotPasswordModalShowing.value = true);

  function toQuestions() {
    if (authStore.user?.role.title !== "Консультант") {
      router.push({ name: "My", query: { isOpenNewConsultation: "true", tabId: "questions" } });
    } else {
      router.push({ name: "My", query: { tabId: "applications" } });
    }

    if (!authStore.getUserInfo) {
      router.push({ query: { isOpenNewConsultation: "true", tabId: "questions" } });
      showLoginModal();
    }
  }
  function toCreateQuestion(consultant: any) {
    if (!authStore.getUserInfo) {
      router.push({
        query: { isOpenNewConsultation: "true", tabId: "questions", consultantId: consultant.user.id },
      });
      showLoginModal();
      return;
    } else if (authStore.user?.role.title == "Консультант") {
      router.push({ name: "My", query: { tabId: "applications" } });
      return;
    } else {
      showModal.value = true;
    }
  }

  function toOldWebinars() {
    if (authStore.user?.role.title === "Консультант") {
      alert("Вы консультант, зайдите под учёткой родителя");
      return;
    }
    router.push({ name: "My", query: { actual: "no", tabId: "webinars" } });
    if (!authStore.getUserInfo) {
      showLoginModal();
    }
  }
  function toOldQuestions() {
    if (authStore.user?.role.title === "Консультант") {
      alert("Вы консультант, зайдите под учёткой родителя");
      return;
    }
    router.push({ name: "My", query: { actual: "no", tabId: "questions" } });
    if (!authStore.getUserInfo) {
      router.push({ query: { actual: "no", tabId: "questions" } });
      showLoginModal();
    }
  }
  provide(AuthModalInjectionKey, {
    toQuestions,
    toOldQuestions,
    toOldWebinars,
    toCreateQuestion,
    showForgotPasswordModal,
    showRegistrationModal,
    showLoginModal,
    isLoginModalShowing,
    isRegistrationModalShowing,
    isForgotPasswordModalShowing,
  });
  return {
    toQuestions,
    toOldQuestions,
    toOldWebinars,
    toCreateQuestion,
    showForgotPasswordModal,
    showRegistrationModal,
    showLoginModal,
    isLoginModalShowing,
    isRegistrationModalShowing,
    isForgotPasswordModalShowing,
  };
}

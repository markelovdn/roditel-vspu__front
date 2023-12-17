import { InjectionKey, Ref } from "vue";

import { Consultant } from "@/components/common/Home/ConsultantsCard/types";

export type AuthModalProviderData = {
  toQuestions: () => void;
  toOldQuestions: () => void;
  toOldWebinars: () => void;
  toCreateQuestion: (isShowModal: Ref<boolean>, consultant: Consultant) => void;
  webinarRegistration: (webinarId: number, userId: number) => void;
  showForgotPasswordModal: () => boolean;
  showRegistrationModal: () => boolean;
  showLoginModal: () => boolean;
  isLoginModalShowing: Ref<boolean>;
  isRegistrationModalShowing: Ref<boolean>;
  isForgotPasswordModalShowing: Ref<boolean>;
};
export const AuthModalInjectionKey: InjectionKey<AuthModalProviderData> = Symbol("authModal");

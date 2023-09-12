import { ref } from "vue";
import type { TRegistrationPayload } from "@/components/modals/RegistrationModal/types";

const dataConsultant = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  specializationId: null,
  professionId: null,
  password: "",
  role_code: "",
});

const dataParented = ref<TRegistrationPayload>({
  name: "",
  phone: "",
  email: "",
  password: "",
  role_code: "",
  region: ""
});

export function useRegistrationForm(param: string | undefined) {

  const data = param === 'consultant' ? dataConsultant : dataParented

  return { data }
}
import { defineStore } from "pinia";
import { ref } from "vue";

import { consultationsApi } from "@/api";
import { TConsultation, TGetConsultationsFilter } from "@/api/Consultations/types";
import { socketConnection } from "@/common/socket";

import { useAuthStore } from "./authStore";
//todo описать тип
type TSocketEvent = {
  text: string;
  id: number;
};

export const useConsultationsStore = defineStore("consultationsStore", () => {
  const authStore = useAuthStore();
  const userId = authStore.getUserId;
  const messages = ref<TSocketEvent[]>([]);
  const consultations = ref<TConsultation>({} as TConsultation);

  function connectChannel(consultationId: number) {
    socketConnection.private(`Consultation.${consultationId}`).listen("ConsultationEvent", (event: TSocketEvent) => {
      messages.value.push(event);
    });
  }

  function requestConsultations(filters: TGetConsultationsFilter) {
    if (userId === undefined) return;
    consultationsApi.getConsultations(userId, filters).then((resp) => {
      consultations.value = resp.data.data[0];
    });
  }

  // const sendMessage = () => {
  //   axios.post("/messages", { message: newMessage.value });
  //   console.log(newMessage.value);
  //   newMessage.value = "";
  // };

  return {
    connectChannel,
    requestConsultations,
    messages,
    consultations,
  };
});

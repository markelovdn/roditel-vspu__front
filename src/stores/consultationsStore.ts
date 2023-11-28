import { defineStore } from "pinia";
import { ref } from "vue";

import { consultationsApi } from "@/api";
import { TConsultation, TGetConsultationsFilter, TMessage } from "@/api/Consultations/types";
import { socketConnection } from "@/common/socket";

import { useAuthStore } from "./authStore";
//todo описать тип
type TSocketEvent = {
  message: TMessage;
  id: number;
};

export const useConsultationsStore = defineStore("consultationsStore", () => {
  const authStore = useAuthStore();
  const userId = authStore.getUserId;
  const consultations = ref<TConsultation[]>([]);

  function connectChannel(consultationId: number) {
    socketConnection.leaveAllChannels();
    socketConnection.private(`Consultation.${consultationId}`).listen("ConsultationEvent", (event: TSocketEvent) => {
      const index = consultations.value.findIndex((c) => c.id == event.id);
      consultations.value[index].messages.push(event.message);
    });
  }
  function sendMessage(message: string, id: number) {
    consultationsApi.sendMessage(message, id);
  }

  async function requestConsultations(filters: TGetConsultationsFilter) {
    if (userId === undefined) return Promise.reject(new Error("userId is undefined"));
    return consultationsApi
      .getConsultations(userId, filters)
      .then((resp) => {
        consultations.value = resp.data.data;
        return resp.data.data;
      })
      .catch((err) => err);
  }

  return {
    connectChannel,
    requestConsultations,
    sendMessage,
    consultations,
  };
});

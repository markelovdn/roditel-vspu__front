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
  const consultations = ref<TConsultation[]>([]);

  function connectChannel(consultationId: number) {
    socketConnection.leaveAllChannels();
    socketConnection.private(`Consultation.${consultationId}`).listen("ConsultationEvent", (event: TSocketEvent) => {
      console.log(event);
      //добавляем сообщение в consultations.value[index].messages.push(event)
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

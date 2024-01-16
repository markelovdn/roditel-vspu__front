import { defineStore } from "pinia";
import { ref } from "vue";

import { consultationsApi } from "@/api";
import { TConsultation, TConsultationPayload, TGetConsultationsFilter, TMessage } from "@/api/Consultations/types";
import { socketConnection, socketReset } from "@/common/socket";
import notify from "@/utils/notify";

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
    const socketToken = socketConnection.options.auth.headers.Authorization;
    if ((socketToken === "Bearer null" && authStore.token) || socketToken !== `Bearer ${authStore.token}`) {
      socketReset();
    }
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

  async function createConsultation(consultation: TConsultationPayload<number | null>) {
    if (userId === undefined) return Promise.reject(new Error("userId is undefined"));
    return consultationsApi
      .addConsultation(userId, consultation)
      .then(() => {
        notify({
          type: "positive",
          message: "Заявка на консультацию успешно создана",
        });
        requestConsultations({});
      })

      .catch((err) => {
        err;
        notify({
          type: "negative",
          message: "Не удалось создать заявку на консультацию",
        });
      });
  }

  function closeConsultation(consultationId: number) {
    consultationsApi.closeConsultation(consultationId);
    consultations.value[consultations.value.findIndex((c) => c.id === consultationId)].closed = true;
  }

  return {
    connectChannel,
    requestConsultations,
    sendMessage,
    createConsultation,
    consultations,
    closeConsultation,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

import { consultationsApi } from "@/api";
import { TConsultation, TGetConsultationsFilter } from "@/api/Consultations/types";
import { socketConnection } from "@/common/socket";

import { useAuthStore } from "./authStore";

export const useConsultationsStore = defineStore("consultationsStore", () => {
  const authStore = useAuthStore();
  const userId = authStore.getUserId;
  const messages = ref([]);
  const consultations = ref<TConsultation[]>([]);

  function connectChannel(consultationId: number) {
    console.log(consultationId);
    socketConnection.private(`App.Models.Consultation.${consultationId}`).listen("ConsultationEvent", (event) => {
      console.log(consultationId);
      messages.value.push(event);
    });
  }

  function getConsultations(filters: TGetConsultationsFilter) {
    if (userId === undefined) return;
    consultationsApi.getConsultations(userId, filters).then((resp) => {
      consultations.value = resp.data.data;
    });
  }

  // const sendMessage = () => {
  //   axios.post("/messages", { message: newMessage.value });
  //   console.log(newMessage.value);
  //   newMessage.value = "";
  // };

  return {
    connectChannel,
    getConsultations,
    messages,
    consultations,
  };
});

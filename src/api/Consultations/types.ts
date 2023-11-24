export type TGetConsultationsFilter = {
  dateBetween?: string;
  status?: string;
  search?: string;
  category?: string;
  consultantId?: string;
};

export type TConsultationPayload<ConsultantId extends number | undefined> = {
  title: string;
  consultantId?: ConsultantId;
  allConsultants: ConsultantId extends undefined ? true : false;
  messageText: string;
  specializationId: number;
};

export type TConsultation = {
  id: number;
  title: string;
  allConsultants: boolean;
  messages: messages;
  specialization: {
    id: number;
    title: string;
  };
};

export type messages = Array<{
  userId: number;
  text: string;
  readed: boolean;
  createdAt: string;
  updatedAt: string;
}>;

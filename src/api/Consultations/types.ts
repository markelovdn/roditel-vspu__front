import { TUser } from "../Auth/types";

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
  messages: TMessages;
  users: TUser[];
  closed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  userId: number;
  text: string;
  readed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TMessages = TMessage[];

import { TUser } from "../Auth/types";

export type TGetConsultationsFilter = {
  dateBetween?: string;
  status?: string;
  search?: string;
  category?: string;
  consultantId?: string;
};

export type TConsultationPayload<ConsultantId extends number | null> = {
  consultantId?: number | null;
  allConsultants: ConsultantId extends null ? true : false;
  messageText: string;
  specializationId: number | null;
};

export type TConsultation = {
  id: number;
  title: string;
  allConsultants: boolean;
  messages: TMessages;
  users: TUser[];
  closed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TMessage = {
  userId: number;
  text: string;
  readed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TMessages = TMessage[];

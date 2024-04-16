import { TUser } from "../Auth/types";
import { TSpecialization } from "../Consultant/types";

export type TGetConsultationsFilter = {
  dateBetween?: string;
  page?: number;
  status?: string;
  search?: string;
  searchField?: string;
  category?: string;
  consultantId?: string;
  actual?: "yes" | "no" | boolean;
};

export type TConsultationPayload<ConsultantId extends number | null> = {
  consultantId?: ConsultantId;
  allConsultants: ConsultantId extends null ? true : false;
  messageText: string;
  specializationsId: number[];
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
  specializations: Array<TSpecialization>;
  region: string;
};

export type TMessage = {
  userId: number;
  text: string;
  readed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TMessages = TMessage[];

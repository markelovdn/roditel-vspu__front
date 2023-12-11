export type TConsultantFeedbackPayload = {
  consultationId: number;
  quality: number;
  conditions: number;
  availability: number;
  politeness: number;
  complaints: string;
  proposals: string;
};

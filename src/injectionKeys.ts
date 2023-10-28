import { InjectionKey } from "vue";

export type TSurveyProviderData = {
  // surveyData: Ref<{
  //     title: string;
  //     description: string;
  //     answerBefore?: string | undefined;
  //     questions: {
  //         id?: number | null | undefined;
  //         text: string;
  //         description?: string | undefined;
  //         type: string;
  //         options: {
  //             ...;
  //         }[];
  //     }[];
  // }>;
  // delQuestion: (index: number) => void;
  // addOptions: (index: number) => void;
  // delOption: (questionIndex: number, optionIndex: number) => void;
  // addFreeOption: (index: number) => void;
};
export const SurveyInjectionKey: InjectionKey<TSurveyProviderData> = Symbol("survey");

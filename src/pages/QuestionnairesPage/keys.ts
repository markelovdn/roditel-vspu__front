import { InjectionKey } from "vue";

import { TQuestionnairePayload } from "./types";

export const SurveyDataKey: InjectionKey<TQuestionnairePayload> = Symbol("SurveyDataKey");

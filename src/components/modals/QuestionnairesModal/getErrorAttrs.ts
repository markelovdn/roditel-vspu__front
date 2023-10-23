import { TQuestionnairePayload } from "@/api/Questionnaires/types";
import { useValidation } from "@/hooks/useValidation";
import { data, emit } from "./CreateForm.vue";

export const { handleBlur, getErrorAttrs } = useValidation<TQuestionnairePayload>(data, emit, {
title: { requiredValidator },
description: "",
answerBefore: ""
});

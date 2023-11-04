import { ref } from "vue";
import { useRouter } from "vue-router";

import { TQuestionnairePayload, TQuestionType } from "@/api/Questionnaires/types";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";
import notify from "@/utils/notify";

export function useQuestionnaire() {
  const router = useRouter();

  const SurveyData = ref<TQuestionnairePayload>({
    id: null,
    title: "",
    description: "",
    answerBefore: "",
    updatedAt: "",
    questions: [],
  });
  const defaultOption = { text: "" };

  const questionnairesStore = useQuestionnairesStore();

  const submitQuestionnaires = () => {
    SurveyData.value.questions.forEach(
      (question) => (question.options = question.options.filter((option) => option.text !== "")),
    );
    if (!router.currentRoute.value.params.id) {
      questionnairesStore.addQuestionnaire(1, SurveyData.value);
    } else {
      questionnairesStore.updateQuestionnaire(Number(router.currentRoute.value.params.id), SurveyData.value);
    }

    router.push({ name: "My" });
  };

  const addQuestions = () => {
    SurveyData.value.questions.push({
      text: "",
      description: "",
      type: "single",
      options: [{ text: "Вариант 1" }, { text: "" }],
      other: {
        show: false,
        text: "",
      },
    });
  };

  const delQuestion = (index: number) => {
    SurveyData.value.questions.splice(index, 1);
  };

  const addOptions = (questionIndex: number, optionIndex: number) => {
    if (SurveyData.value.questions[questionIndex].options[optionIndex].text === "") {
      SurveyData.value.questions[questionIndex].options.push({ ...defaultOption });
      SurveyData.value.questions[questionIndex].options[optionIndex].text = `Вариант ${optionIndex + 1}`;
    }
  };

  const delOption = (questionIndex: number, optionIndex: number) => {
    if (SurveyData.value.questions[questionIndex].options.length > 2) {
      SurveyData.value.questions[questionIndex].options.splice(optionIndex, 1);
    } else {
      notify({
        type: "negative",
        message: "Вопрос должен содержать не менее двух вариантов ответа",
      });
    }
  };

  const delOther = (questionIndex: number) => {
    SurveyData.value.questions[questionIndex].other.show = false;
  };

  const changeTypeQuestion = (questionIndex: number, type: TQuestionType) => {
    if (type === "text") {
      SurveyData.value.questions[questionIndex].other.show = true;
      SurveyData.value.questions[questionIndex].options = [{ text: "Вариант 1" }, { text: "" }];
    } else {
      SurveyData.value.questions[questionIndex].other.show = false;
    }
  };

  return {
    submitQuestionnaires,
    addQuestions,
    delQuestion,
    addOptions,
    delOption,
    delOther,
    changeTypeQuestion,
    SurveyData,
    router,
    questionnairesStore,
  };
}

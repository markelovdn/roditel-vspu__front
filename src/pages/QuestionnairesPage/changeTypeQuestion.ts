import { TQuestionType } from "./types";
import { SurveyData } from "./QuestionnairesPage.vue";

export const changeTypeQuestion = (questionIndex: number, type: TQuestionType) => {
if (type === "text") {
SurveyData.value.questions[questionIndex].options = [];
SurveyData.value.questions[questionIndex].other.show = true;
} else {
SurveyData.value.questions[questionIndex].other.show = false;
// TODO: не смог придумать как сохранять ответы при смене типа вопроса с одного ответа на множественный выбор
// SurveyData.value.questions[questionIndex].options = [{ text: "Вариант 1" }, { text: "" }];
}
};

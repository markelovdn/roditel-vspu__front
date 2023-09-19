<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { type TWebinarGetData } from "./types";
import axios from "@/common/axios";
import { mdiClose } from '@quasar/extras/mdi-v6'

const emit = defineEmits(["close"]);

const webinar = ref<TWebinarGetData>({
  id: null,
  title: "",
  questions: {
    question_text: ""
  }
})

const getWebinarsQuestions = async () => {
  await axios
//TODO:передать id нормально
    .get("/api/webinarsQuestions/11")
    .then((response) => {
      webinar.value = response.data.data[0]
      console.log(response);
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const registrationPartisipantToWebinar = async () => {
  await axios
//TODO:передать user_id из стора зарегистрированного пользователя
    .post("/api/webinarPartisipants")
    .then((response) => {
      console.log(response);
    })
    .catch((errors) => {
      console.log(errors);
    });
};

onMounted(async () => {
  getWebinarsQuestions();
});

</script>

<template>
  <ModalWrapper >
    <div class="fit absolute-top q-pt-md q-pr-md">
      <q-icon :name="mdiClose" class="float-right cursor-pointer" @click="emit('close')"/>
    </div>

    <div class="q-pb-lg">
      <span class="header-title text-uppercase text-primary">{{ webinar.title }}</span>
    </div>
    <div class="q-mb-lg line"></div>
    <div class="q-pb-lg">
      <span class="question-title text-uppercase">Вопросы к обсуждению:</span>
    </div>
  <div v-for="(question, index) in webinar.questions">

  <div class="text-question q-pb-md">{{ index+1 }}. {{ question.question_text }}</div>
  </div>

    <div class="fit q-pt-lg footer">
      <q-btn label="Принять участие" class="q-btn--form" color="primary" @click="registrationPartisipantToWebinar"/>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.header-title {
font-size: 20px;
font-weight: 500;
line-height: 30px;
letter-spacing: 0em;
text-align: left;

}
.question-title {
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: $Text-color
}
.text-question {
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: $Text-color
}
.line {
  border-bottom: .5px solid $grey-1;
}
</style>

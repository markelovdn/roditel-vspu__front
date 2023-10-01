<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { type TWebinarResponse } from "./types";
import axios from "@/common/axios";
import { useModal } from "@/hooks/useModal";

const emit = defineEmits(["close"]);

const { closeModal } = useModal(emit);

const webinar = ref<TWebinarResponse>({
  id: null,
  title: "",
  questions: [
    {
      id: null,
      questionText: ""
    }
  ]  
})

const getWebinarsQuestions = async () => {
  await axios
//TODO:передать id нормально
    .get("/api/webinars/11")
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
    .post("/api/webinarPartisipants", {
      user_id: 1,
      webinar_id: 1
    })
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
  <ModalWrapper closeButtonHeader @close="closeModal">
    <div class="q-pb-lg">
      <span class="header-title text-uppercase text-primary">{{ webinar.title }}</span>
    </div>
    <div class="q-mb-lg line"></div>
    <div class="q-pb-lg">
      <span class="question-title text-uppercase">Вопросы к обсуждению:</span>
    </div>
  <div v-for="(question, index) in webinar.questions">

  <div class="text-question q-pb-md">{{ index+1 }}. {{ question.questionText }}</div>
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
letter-spacing: 0;
text-align: left;

}

.question-title {
  color: $Text-color;
  line-height: 19px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0
}

.text-question {
  color: $Text-color;
  line-height: 18px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0
}

.line {
  border-bottom: .5px solid $grey-1;
}
</style>

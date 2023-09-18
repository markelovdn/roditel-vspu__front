<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { type TVebinarGetData } from "./types";
import axios from "@/common/axios";
import { mdiClose } from '@quasar/extras/mdi-v6'

const emit = defineEmits(["close"]);

const vebinar = ref<TVebinarGetData>({
  title: "",
  questions: {
    question_text: ""
  }
})

const getData = async () => {
  await axios
//передать id нормально
    .get("/api/vebinarsQuestions/11")
    .then((response) => {
      vebinar.value = response.data.data[0]
      console.log(response.data);
    })
    .catch((errors) => {
      console.log(errors);
    });
};

onMounted(async () => {
  getData();
});

</script>

<template>
  <ModalWrapper >
    <div class="fit absolute-top q-pt-md q-pr-md">
      <q-icon :name="mdiClose" class="float-right cursor-pointer" @click="emit('close')"/>
    </div>

    <div class="q-pb-lg">
      <span class="header-title text-uppercase text-primary">{{ vebinar.title }}</span>
    </div>
    <div class="q-mb-lg line"></div>
    <div class="q-pb-lg">
      <span class="question-title text-uppercase">Вопросы к обсуждению:</span>
    </div>
  <div v-for="(question, index) in vebinar.questions">

  <div class="text-question q-pb-xs">{{ index+1 }}. {{ question.question_text }}</div>
  </div>

    <div class="fit q-pt-lg footer">
      <q-btn label="Принять участие" class="q-btn--form" color="primary" />
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

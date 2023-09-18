<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { type TVebinarGetData } from "./types";
import axios from "@/common/axios";
import { useModal } from "@/hooks/useModal";

const emit = defineEmits(["close"]);

const { closeModal } = useModal(emit);
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
{{ vebinar.title }}

<ul>
  <li v-for="question in vebinar.questions">
  {{ question.question_text }}
  </li>
</ul>

    <div class="fit q-mb-sm footer">
      <q-btn label="Принять участие" class="q-btn--form" color="primary" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>

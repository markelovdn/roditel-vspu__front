<script setup lang="ts">
import { defineProps, inject, ref } from "vue";

const textFree = ref(false);
const props = defineProps<{
  questionIndex: number;
}>();

const { SurveyData, delOption, addOptions, addFreeOption } = inject("SurveyData");
</script>

<template>
  <!-- Ответы -->
  <div v-for="(option, optionIndex) in SurveyData.questions[props.questionIndex].options" :key="optionIndex">
    <div class="flex">
      <span>Ответ {{ optionIndex + 1 }}</span>
      <q-btn class="btn-delete" dense size="xs" color="negative" @click="delOption(props.questionIndex, optionIndex)">
        Удалить ответ
      </q-btn>
    </div>

    <q-input v-model="option.text" class="q-mb-sm" label="Тектс ответа*" />
  </div>
  <div class="row no-wrap q-mt-lg">
    <q-checkbox v-model="textFree" @update:model-value="addFreeOption(props.questionIndex)" />
    <q-btn label="Добавить ответ" class="q-btn--form" color="primary" @click="addOptions(props.questionIndex)"></q-btn>
  </div>
</template>

<style lang="scss" scoped>
.btn-delete {
  height: unset;
}
</style>

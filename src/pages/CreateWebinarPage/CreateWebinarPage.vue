<script setup lang="ts">
import { ValidationArgs } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { TWebinarPayload } from "@/api/Webinars/types";
import LectorModal from "@/components/modals/LectorModal/LectorModal.vue";
import { useCloseConfirm } from "@/hooks/useCloseConfirm";
import { maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const { getWebinarCategoriesWithAll: optionsCategories, getWebinarLectorsWithAll: optionsLectors } =
  storeToRefs(webinarsStore);
const emit = defineEmits(["validation-change", "update:model-value"]);
const router = useRouter();

const data = ref<TWebinarPayload>({
  id: null,
  title: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  logo: null,
  cost: 0.0,
  videoLink: "",
  webinarCategoryId: null,
  webinarQuestions: [],
  webinarLectorsId: [],
});

const { handleBlur, getErrorAttrs, isValid } = useValidation<TWebinarPayload>(data, emit, {
  title: { requiredValidator, maxLengthValidator: maxLengthValidator(255) },
  date: { requiredValidator },
  id: {},
  timeStart: { requiredValidator },
  timeEnd: { requiredValidator },
  videoLink: { requiredValidator },
  logo: {},
  cost: {},
  webinarCategoryId: { requiredValidator },
  webinarQuestions: {
    $each: helpers.forEach({
      questionText: { requiredValidator },
    }),
  } as ValidationArgs,
  webinarLectorsId: { requiredValidator },
});

const isShowLectorModal = ref(false);
const { confirmCancel } = useCloseConfirm(data, "My", { tabId: "webinars" });

const handleCreateWebinar = () => {
  webinarsStore.addWebinar(data.value);
  router.push({ name: "My", query: { tabId: "webinars" } });
};

const addQuestion = () => {
  data.value.webinarQuestions.push({
    id: null,
    questionText: "",
  });
};

const delQuestion = (index: number) => {
  data.value.webinarQuestions.splice(index, 1);
};

const checkFileType = (files: readonly File[] | FileList | null | undefined) => {
  if (!files) {
    return [];
  }

  const fileList = "length" in files ? Array.from(files) : files;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

  const filteredFiles = fileList.filter((file: File) => allowedTypes.includes(file.type));
  return filteredFiles;
};

onMounted(async () => {
  webinarsStore.requestLectors();
  webinarsStore.requestWebinarCategories();

  // if (router.currentRoute.value.params.id) {
  //   await webinarsStore.showWebinar(Number(router.currentRoute.value.params.id));
  //   data.value = webinarsStore.webinar;

  //   SurveyData.value.questions.forEach((question) => {
  //     question.options.push({ text: "" });
  //     if (question.other === null) {
  //       question.other = { show: false, text: "" };
  //     }
  //   });
  // }
});

const handleLectorAdded = () => {
  webinarsStore.requestLectors();
  isShowLectorModal.value = false;
};
</script>

<template>
  <div class="main-container">
    <h4>Создать вебинар</h4>
    <q-input
      v-bind="getErrorAttrs('title')"
      v-model="data.title"
      autogrow
      label="Название вебинара"
      @blur="handleBlur('title')" />
    <q-input
      v-bind="getErrorAttrs('date')"
      v-model="data.date"
      mask="##.##.####"
      label="Дата проведения:"
      @blur="handleBlur('date')">
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="data.date" mask="DD.MM.YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Закрыть" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div>
      <q-input
        v-bind="getErrorAttrs('timeStart')"
        v-model="data.timeStart"
        mask="time"
        :rules="['time']"
        label="Время начала:"
        @blur="handleBlur('timeStart')">
        <template #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="data.timeStart">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-bind="getErrorAttrs('timeEnd')"
        v-model="data.timeEnd"
        mask="time"
        :rules="['time']"
        label="Время окончания:"
        @blur="handleBlur('timeEnd')">
        <template #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="data.timeEnd">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-file v-model="data.logo" accept="image/*" :filter="checkFileType" label="Выберите логотип" />

    <q-input
      v-bind="getErrorAttrs('videoLink')"
      v-model="data.videoLink"
      label="Ссылка на видео"
      @blur="handleBlur('videoLink')" />

    <q-select
      v-bind="getErrorAttrs('webinarCategoryId')"
      v-model="data.webinarCategoryId"
      input-class="q-select--form"
      label="Категория*"
      class="fit q-mb-sm"
      :options="optionsCategories"
      :option-label="(item) => item.label"
      emit-value
      map-options
      @blur="handleBlur('webinarCategoryId')" />
    <div class="questions">
      <q-select
        v-bind="getErrorAttrs('webinarLectorsId')"
        v-model="data.webinarLectorsId"
        input-class="q-select--form"
        label="Выберите ведущих*"
        class="fit q-mb-sm"
        multiple
        :options="optionsLectors"
        :option-label="(item) => item.label"
        :option-value="(item) => item.value"
        emit-value
        map-options
        @blur="handleBlur('webinarLectorsId')" />

      <q-btn
        v-show="data.webinarLectorsId.length === 1"
        icon="edit"
        color="primary"
        size="xs"
        class="q-ml-md q-mb-md"
        @click="isShowLectorModal = true"></q-btn>
      <q-btn
        v-show="data.webinarLectorsId.length === 0"
        icon="add"
        color="primary"
        size="xs"
        class="q-ml-md q-mb-md"
        @click="isShowLectorModal = true"></q-btn>
    </div>

    <div v-for="(question, id) in data.webinarQuestions" :key="id" class="questions">
      <q-input
        v-bind="getErrorAttrs('webinarQuestions', 'questionText', id)"
        v-model="question.questionText"
        style="width: 100%"
        :label="`Вопрос ${id + 1}`"
        @blur="handleBlur('questionText')" />
      <q-icon :name="'close'" style="font-size: large; cursor: pointer" @click="delQuestion(id)" />
    </div>

    <div class="add-question">
      <q-btn label="Добавить вопрос" size="md" class="q-mt-sm float-left" color="primary" @click="addQuestion()" />
    </div>

    <div class="row justify-between q-mt-lg">
      <q-btn
        label="Сохранить"
        class="q-btn--form"
        size="md"
        color="primary"
        :disable="!isValid"
        @click="handleCreateWebinar()" />
      <q-btn label="Отменить" class="q-btn--form" color="grey-2" @click="confirmCancel()"></q-btn>
    </div>
  </div>

  <LectorModal v-if="isShowLectorModal" :lector-id="data.webinarLectorsId[0]" @close="handleLectorAdded"></LectorModal>
</template>

<style lang="scss" scoped>
.add-question {
  display: inline-block;
  width: 100%;
  align-items: start;
}
.questions {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 0;
}
</style>

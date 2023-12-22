<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { TWebinarPayload, TWebinarsLector } from "@/api/Webinars/types";
import { useConsultantsAdminStore } from "@/stores/adminStore/consultantsAdminStore";
import { useWebinarsStore } from "@/stores/webinarsStore";

const consultationsAdminStore = useConsultantsAdminStore();
const webinarsStore = useWebinarsStore();
const { getWebinarCategoriesWithAll: optionsCategories } = storeToRefs(webinarsStore);
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
  webinarQuestions: [
    {
      id: null,
      questionText: "",
    },
  ],
  webinarLectorsId: [],
});

const lectors = ref<TWebinarsLector[]>([]);

const handleCreateWebinar = () => {
  consultationsAdminStore.createWebinar(data.value);
};
const back = () => {
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
  lectors.value = await consultationsAdminStore.getLectors();
  webinarsStore.requestWebinarCategories();
});
</script>

<template>
  <div class="main-container">
    <h4>Создать вебинар</h4>
    <q-input v-model="data.title" autogrow class="q-mb-sm" label="Название вебинара" />
    <q-input v-model="data.date" mask="##.##.####" label="Дата проведения:">
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
      <q-input v-model="data.timeStart" mask="time" :rules="['time']" label="Время начала:">
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

      <q-input v-model="data.timeEnd" mask="time" :rules="['time']" label="Время окончания:">
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

    <q-input v-model="data.videoLink" class="q-mb-sm" label="Ссылка на видео" />

    <q-select
      v-model="data.webinarCategoryId"
      input-class="q-select--form"
      label="Категория*"
      class="fit q-mb-sm"
      :options="optionsCategories"
      :option-label="(item) => item.label"
      emit-value
      map-options />

    <q-select
      v-model="data.webinarLectorsId"
      input-class="q-select--form"
      label="Выберите ведущих*"
      class="fit q-mb-sm"
      multiple
      :options="lectors"
      :option-label="(item) => item.lectorName"
      :option-value="(item) => item.id"
      emit-value
      map-options />
    <div v-for="(question, id) in data.webinarQuestions" :key="id" class="questions">
      <q-input v-model="question.questionText" style="width: 100%" :label="`Вопрос ${id + 1}`" />
      <q-icon :name="'close'" style="font-size: large; cursor: pointer" @click="delQuestion(id)" />
    </div>
    <div class="add-question">
      <q-btn label="Добавить вопрос" class="q-btn--form float-left q-mt-lg" color="primary" @click="addQuestion()" />
    </div>

    <div class="row justify-between q-mt-lg">
      <q-btn label="Сохранить" class="q-btn--form" color="primary" @click="handleCreateWebinar()" />
      <q-btn label="Отменить" class="q-btn--form" color="grey-2" @click="back"></q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-question {
  display: inline-block;
}
.questions {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: nowrap;
}
</style>

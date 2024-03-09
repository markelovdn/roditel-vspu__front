<script setup lang="ts">
import { ValidationArgs } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { TWebinarData, TWebinarPayload } from "@/api/Webinars/types";
import LectorModal from "@/components/modals/LectorModal/LectorModal.vue";
import { useCloseConfirm } from "@/hooks/useCloseConfirm";
import { maxLengthValidator, requiredValidator, useValidation } from "@/hooks/useValidation";
import { useWebinarsStore } from "@/stores/webinarsStore";

const props = defineProps<{
  webinarItem?: TWebinarData;
}>();

const webinarsStore = useWebinarsStore();
const { getWebinarCategoriesWithAll: optionsCategories, getWebinarLectorsWithAll: optionsLectors } =
  storeToRefs(webinarsStore);
const emit = defineEmits(["validation-change", "update:model-value", "set-webinar"]);
const previewImage = ref("");
const input = ref<HTMLInputElement>();

const data = ref<TWebinarPayload>(
  props.webinarItem
    ? {
        id: props.webinarItem.id,
        title: props.webinarItem.title,
        date: props.webinarItem.date,
        timeStart: props.webinarItem.timeStart,
        timeEnd: props.webinarItem.timeEnd,
        logo: props.webinarItem.logo,
        cost: props.webinarItem.cost,
        prefixSertificate: props.webinarItem.prefixSertificate,
        numberSertificate: props.webinarItem.numberSertificate,
        videoLink: props.webinarItem.videoLink,
        webinarCategoryId: props.webinarItem.webinarCategory.id || null,
        webinarQuestions: props.webinarItem.questions,
        webinarLectorsId: props.webinarItem.lectors.map((item) => item.id as number),
      }
    : {
        id: null,
        title: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        logo: null,
        cost: 0.0,
        prefixSertificate: "",
        numberSertificate: 0,
        videoLink: "",
        webinarCategoryId: null,
        webinarQuestions: [],
        webinarLectorsId: [],
      },
);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TWebinarPayload>(data, emit, {
  title: { requiredValidator, maxLengthValidator: maxLengthValidator(255) },
  date: { requiredValidator },
  id: {},
  timeStart: { requiredValidator },
  timeEnd: { requiredValidator },
  videoLink: { requiredValidator },
  logo: {},
  cost: {},
  prefixSertificate: { requiredValidator },
  numberSertificate: { requiredValidator },
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

const addQuestion = () => {
  data.value.webinarQuestions.push({
    id: null,
    questionText: "",
  });
};

const delQuestion = (index: number) => {
  data.value.webinarQuestions.splice(index, 1);
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  data.value.logo = file;

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      previewImage.value = fileReader.result as string;
    });
  }
};

const editPhoto = () => {
  input.value?.click();
};

const deletePhoto = () => {
  previewImage.value = "";
  data.value.logo = null;
};

onMounted(async () => {
  webinarsStore.requestLectors();
  webinarsStore.requestWebinarCategories();
});

const handleLectorAdded = () => {
  webinarsStore.requestLectors();
  isShowLectorModal.value = false;
};

const handleSetWebinar = () => {
  if (typeof data.value.logo === "string") {
    data.value.logo = null;
  }

  emit("set-webinar", data.value);
};
</script>

<template>
  <div class="main-container">
    <h4 v-if="!webinarItem">Создать вебинар</h4>
    <h4 v-else>Редактировать вебинар</h4>
    <div class="photo-container">
      <input
        ref="input"
        style="display: none"
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        @change="handleFileChange" />

      <div v-if="previewImage || webinarItem" class="photo">
        <img :src="previewImage || webinarItem?.logo" class="photo" />
        <div class="caption">
          <div class="caption-icon">
            <div>
              <q-icon name="edit" size="xs" @click="editPhoto"></q-icon>
            </div>
            <div>
              <q-icon v-if="previewImage" name="delete" size="xs" @click="deletePhoto"></q-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!previewImage && !webinarItem" class="empty-photo">
        <q-icon name="camera" size="lg" color="primary" @click="editPhoto"></q-icon>
        <span>Логотип</span>
      </div>
    </div>
    <q-input
      v-bind="getErrorAttrs('title')"
      v-model="data.title"
      autogrow
      label="Название вебинара"
      @blur="handleBlur('title')" />
    <div class="row">
      <q-input
        v-bind="getErrorAttrs('date')"
        v-model="data.date"
        class="col full-width q-pr-sm"
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
      <q-input
        v-bind="getErrorAttrs('timeStart')"
        v-model="data.timeStart"
        class="col full-width q-pr-sm"
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
        class="col full-width"
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

    <q-input
      v-bind="getErrorAttrs('videoLink')"
      v-model="data.videoLink"
      label="Ссылка на видео"
      @blur="handleBlur('videoLink')" />

    <q-input
      v-bind="getErrorAttrs('prefixSertificate')"
      v-model="data.prefixSertificate"
      label="Префикс номера сертификата"
      @blur="handleBlur('prefixSertificate')" />
    <q-input
      v-bind="getErrorAttrs('numberSertificate')"
      v-model="data.numberSertificate"
      label="Стартовый номер сертификата"
      @blur="handleBlur('numberSertificate')" />

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
        :label="webinarItem ? 'Изменить' : 'Сохранить'"
        class="q-btn--form"
        size="md"
        color="primary"
        :disable="!isValid"
        @click="handleSetWebinar()" />
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

.photo-container {
  display: flex;
  position: relative;
  justify-content: start;
  align-items: start;
}

.photo {
  display: flex;
  border-radius: 6px;
  width: 67px;
  height: 86px;
  position: relative;
}

.empty-photo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  width: 67px;
  height: 86px;
  position: relative;
  border: solid 1px #ccc;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0 0 6px 6px;
  opacity: 0;
  transition: opacity 0.2s;
  text-align: center;
}

.photo:hover .caption {
  opacity: 1;
}

.caption-icon {
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

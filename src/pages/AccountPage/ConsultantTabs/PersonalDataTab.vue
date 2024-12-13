<script setup lang="ts">
import { storeToRefs } from "pinia";
import { emit } from "process";
import { onMounted, ref, watch } from "vue";

import {
  emailValidator,
  minLengthValidator,
  requiredValidator,
  splitNameValidator,
  useValidation,
} from "@/hooks/useValidation";
import { useAuthStore } from "@/stores/authStore";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useConsultantStore } from "@/stores/consultantStore";

import { TPersonalDataPayload } from "./types";

const authStore = useAuthStore();
const consultantStore = useConsultantStore();

const collectionsStore = useCollectionsStore();
const { getSpecializations: optionsSpecializations, getProfessions: optionsProfessions } =
  storeToRefs(collectionsStore);

const data = ref<TPersonalDataPayload>({
  name: authStore.user?.fullName,
  phone: authStore.user?.phone,
  email: authStore.user?.email,
  specializationsId: null,
  professionId: null,
  description: "",
  image: null,
});

const { handleBlur, getErrorAttrs, isValid } = useValidation<TPersonalDataPayload>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  specializationsId: { requiredValidator },
  professionId: { requiredValidator },
  description: { requiredValidator, minLengthValidator: minLengthValidator(15) },
});

const resetData = () => {
  data.value.name = authStore.user?.fullName;
  data.value.phone = authStore.user?.phone;
  data.value.email = authStore.user?.email;
  data.value.specializationsId = consultantStore.consultantInfo?.specializations?.map((item) => item.id);
  data.value.professionId = consultantStore.consultantInfo?.profession?.id;
  data.value.image = null;
  data.value.description = "";
};

const handleForm = () => {
  Promise.allSettled([
    consultantStore.setNewConsultantInfo(data.value),
    consultantStore.setNewConsultantPhoto(data.value),
  ]).then(() => {
    authStore.requestUserInfo();
    consultantStore.getConsultantInfo();
  });
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

watch(
  () => consultantStore.consultantInfo,
  (newConsultantInfo) => {
    if (newConsultantInfo) {
      data.value.specializationsId = newConsultantInfo.specializations?.map((item) => item.id);
      data.value.professionId = newConsultantInfo.profession?.id;
      data.value.description = newConsultantInfo.description ?? "";
    }
  },
);

onMounted(() => {
  collectionsStore.requestSpecializations();
  collectionsStore.requestProfessions();
  consultantStore.getConsultantInfo();
});
</script>

<template>
  <div class="personal-data">
    <div class="personal-data__wrapper">
      <div class="personal-data__header">
        <h5>Редактирование персональных данных</h5>
      </div>

      <q-form class="personal-data__form">
        <div class="personal-data__box">
          <q-input
            v-bind="getErrorAttrs('name')"
            v-model="data.name"
            outlined
            class="personal-data__item"
            input-class="q-input--form"
            label="Ф.И.О.*"
            borderless
            color="primary"
            @blur="handleBlur('name')" />

          <q-input
            v-bind="getErrorAttrs('phone')"
            v-model="data.phone"
            outlined
            class="personal-data__item"
            input-class="q-input--form"
            label="Телефон*"
            mask="+# (###) ### ####"
            borderless
            @blur="handleBlur('phone')" />
        </div>

        <div class="personal-data__box">
          <q-input
            v-bind="getErrorAttrs('email')"
            v-model="data.email"
            outlined
            class="personal-data__item"
            input-class="q-input--form"
            label="Почта*"
            borderless
            @blur="handleBlur('email')" />

          <q-select
            v-bind="getErrorAttrs('specializationsId')"
            v-model="data.specializationsId"
            input-class="q-select--form"
            label="Специализация*"
            outlined
            multiple
            class="personal-data__item"
            :options="optionsSpecializations"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @blur="handleBlur('specializationsId')" />
        </div>

        <div class="personal-data__box">
          <q-select
            v-bind="getErrorAttrs('professionId')"
            v-model="data.professionId"
            class="personal-data__item"
            input-class="q-select--form"
            label="Подразделение*"
            outlined
            :options="optionsProfessions"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @blur="handleBlur('professionId')" />

          <q-file
            v-bind="getErrorAttrs('image')"
            v-model="data.image"
            class="personal-data__item"
            accept="image/*"
            outlined
            :filter="checkFileType"
            label="Выберите изображение" />
        </div>

        <div class="personal-data__box">
          <q-input
            v-bind="getErrorAttrs('description')"
            v-model="data.description"
            type="textarea"
            class="personal-data__item"
            input-class="q-select--form"
            label="Описание*"
            outlined
            @blur="handleBlur('description')" />

          <div class="personal-data__item">
            <q-img :src="consultantStore.consultantInfo?.photo" class="personal-data__img" spinner-color="white" />
          </div>
        </div>
      </q-form>
      <div class="personal-data__block">
        <q-btn
          label="Сохранить изменения"
          :disable="!isValid"
          class="q-btn--form"
          color="primary"
          @click="handleForm()" />
        <q-btn
          label="Отменить"
          class="q-ml-sm q-btn--form"
          :disable="isValid"
          flat
          :ripple="false"
          color="grey-1"
          @click="resetData()" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-data {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 15px 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__box {
    display: flex;
    gap: 20px;
    padding: 10px 35px;
    background-color: $white;
    border-radius: 0px 0px 10px 10px;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
    @media (max-width: $mobile-max-width) {
      flex-wrap: wrap;
    }
  }

  &__item {
    flex-basis: 100%;
  }

  &__block {
    margin-top: 27px;
    display: flex;
  }

  &__img {
    height: 145px;
    max-width: 150px;
    border-radius: 50%;
  }
}
</style>

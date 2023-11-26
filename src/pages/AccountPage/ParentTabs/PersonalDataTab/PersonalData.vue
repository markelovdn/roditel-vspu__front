<script setup lang="ts">
import { storeToRefs } from "pinia";
import { emit } from "process";
import { onMounted, ref } from "vue";

import {
  emailValidator,
  minLengthValidator,
  requiredValidator,
  splitNameValidator,
  useValidation,
} from "@/hooks/useValidation";
import { useAuthStore } from "@/stores/authStore";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useParentStore } from "@/stores/parentStore";

import { TPersonalDataParentPayload } from "../types";

const authStore = useAuthStore();
const parentStore = useParentStore();
const collectionsStore = useCollectionsStore();

const { getRegions: optionsRegions } = storeToRefs(collectionsStore);

const data = ref<TPersonalDataParentPayload>({
  name: authStore.user?.fullName,
  phone: authStore.user?.phone,
  email: authStore.user?.email,
  region_id: authStore?.user?.ragionId,
});

const { handleBlur, getErrorAttrs, isValid } = useValidation<TPersonalDataParentPayload>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  region_id: { requiredValidator },
});

const handleForm = () => {
  const setResult = parentStore.setParentInfo(data.value);

  if (setResult) {
    setResult.then(() => {
      authStore.requestUserInfo();
    });
  }
};

onMounted(() => {
  collectionsStore.requestRegions();
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
            v-bind="getErrorAttrs('email')"
            v-model="data.email"
            outlined
            class="personal-data__item"
            input-class="q-input--form"
            label="Почта*"
            borderless
            @blur="handleBlur('email')" />
        </div>

        <div class="personal-data__box">
          <q-input
            v-bind="getErrorAttrs('phone')"
            v-model="data.phone"
            outlined
            class="personal-data__item"
            input-class="q-input--form"
            label="Телефон*"
            mask="+7 (###) ### ####"
            borderless
            @blur="handleBlur('phone')" />

          <q-select
            v-bind="getErrorAttrs('region_id')"
            v-model="data.region_id"
            class="personal-data__item"
            input-class="q-select--form"
            label="Регион*"
            outlined
            :options="optionsRegions"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @blur="handleBlur('region_id')" />
        </div>
      </q-form>
      <div class="personal-data__block">
        <q-btn
          label="Сохранить личные данные"
          :disable="!isValid"
          class="q-btn--form"
          color="primary"
          @click="handleForm" />
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

  &__form {
    background-color: $white;
  }

  &__box {
    display: flex;
    gap: 20px;
    padding: 10px 35px;
    background-color: $white;
    border-radius: 0px 0px 10px 10px;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__item {
    flex-basis: 100%;

    &--half {
      flex-basis: 48.7%;
    }
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

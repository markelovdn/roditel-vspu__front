<script setup lang="ts">
import { storeToRefs } from "pinia";
// import { QTableColumn } from "quasar";
import { emit } from "process";
import { computed, onMounted, ref } from "vue";

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
// import notify from "@/utils/notify";

type TPersonalData = {
  name?: string;
  email?: string;
  phone?: string;
  specializationId?: number | null;
  professionId?: number | null;
};

// const dateFilter = ref();
// const consultantStore = useConsultantStore();

const authStore = useAuthStore();
const consultantStore = useConsultantStore();

const collectionsStore = useCollectionsStore();
const { getSpecializations: optionsSpecializations, getProfessions: optionsProfessions } =
  storeToRefs(collectionsStore);

const specializationId = computed(() => {
  const title = consultantStore.consultantInfo?.specialization.title;

  const specialization = optionsSpecializations.value.find((option) => option.label === title);
  return specialization ? Number(specialization.value) : null;
});

const professionId = computed(() => {
  const title = consultantStore.consultantInfo?.specialization.title;

  const profession = optionsSpecializations.value.find((option) => option.label === title);
  return profession ? Number(profession.value) : null;
});

const data = ref<TPersonalData>({
  name: authStore.user?.fullName,
  phone: authStore.user?.phone,
  email: authStore.user?.email,
  specializationId: specializationId.value,
  professionId: professionId.value,
});

const { handleBlur, getErrorAttrs } = useValidation<TPersonalData>(data, emit, {
  name: { requiredValidator, splitNameValidator },
  phone: { requiredValidator, minLengthValidator: minLengthValidator(17) },
  email: { requiredValidator, emailValidator },
  specializationId: { requiredValidator },
  professionId: { requiredValidator },
});

onMounted(() => {
  collectionsStore.requestSpecializations();
  collectionsStore.requestProfessions();
  consultantStore.getConsultantInfo();
});
</script>

<template>
  <div class="personal-form">
    <div class="personal-form__wrapper">
      <div class="personal-form__header">
        <h5>Редактирование персональных данных</h5>
      </div>

      <q-form class="personal-form__box">
        <q-input
          v-bind="getErrorAttrs('name')"
          v-model="data.name"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Ф.И.О.*"
          borderless
          color="primary"
          @blur="handleBlur('name')" />

        <q-input
          v-bind="getErrorAttrs('phone')"
          v-model="data.phone"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Телефон*"
          mask="+7 (###) ### ####"
          borderless
          @blur="handleBlur('phone')" />

        <q-input
          v-bind="getErrorAttrs('email')"
          v-model="data.email"
          outlined
          class="fit q-mb-sm"
          input-class="q-input--form"
          label="Почта*"
          borderless
          @blur="handleBlur('email')" />

        <q-select
          v-bind="getErrorAttrs('specializationId')"
          v-model="data.specializationId"
          input-class="q-select--form"
          label="Специализация*"
          outlined
          class="fit q-mb-sm"
          :options="optionsSpecializations"
          :option-label="(item) => item.label"
          emit-value
          map-options
          @blur="handleBlur('specializationId')" />

        <q-select
          v-bind="getErrorAttrs('professionId')"
          v-model="data.professionId"
          class="fit q-mb-sm"
          input-class="q-select--form"
          label="Подразделение*"
          outlined
          :options="optionsProfessions"
          :option-label="(item) => item.label"
          emit-value
          map-options
          @blur="handleBlur('professionId')" />
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-form {
  background-color: var(--background-table);
  border-radius: 10px;
  box-shadow: 0 4px 35px 0 rgb(46 56 144 / 8%);

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
  &__noData {
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
    opacity: 0.4;
  }

  &__box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 15px 35px;

    background-color: $white;
    border-radius: 0px 0px 10px 10px;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }
}
</style>

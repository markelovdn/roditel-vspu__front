<script setup lang="ts">
import { onMounted, ref } from "vue";

import { TWebinarPayload, TWebinarsLector } from "@/api/Webinars/types";
import { useModal } from "@/hooks/useModal";
import { useConsultantsAdminStore } from "@/stores/adminStore/consultantsAdminStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

const emit = defineEmits(["close"]);
const consultationsAdminStore = useConsultantsAdminStore();

const data = ref<TWebinarPayload>({
  id: null,
  title: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  logo: "",
  cost: 0.0,
  videoLink: "",
  webinarCategoryId: null,
  webinarQuestions: [
    {
      id: null,
      questionText: "",
    },
  ],
});

const lectors = ref<TWebinarsLector[]>([]);
const lectorsChange = ref<TWebinarsLector[]>([lectors.value[0]]);
const addLector = (lector: TWebinarsLector) => {
  lectorsChange.value.push(lector);
};
const { closeModal } = useModal(emit, data);
const handleCreateWebinar = () => {
  consultationsAdminStore.createWebinar(data.value);
  closeModal({ force: true });
};

onMounted(async () => {
  lectors.value = await consultationsAdminStore.getLectors();
});
</script>

<template>
  <div>
    <ModalWrapper header="Задать вопрос">
      <q-input v-model="data.title" autogrow class="q-mb-sm" label="Название вебинара" />

      <div v-for="(item, index) in lectorsChange" :key="index" style="display: flex">
        <q-select
          v-model="lectorsChange[index]"
          input-class="q-select--form"
          label="Выберите ведущего*"
          outlined
          class="fit q-mb-sm"
          :options="lectors"
          :option-label="(item) => item.lectorName"
          emit-value
          map-options />
        <q-btn v-if="index" @click="lectorsChange.splice(index, 1)">X</q-btn>
      </div>

      <q-btn @click="addLector(lectors[0])">добавить еще ведущего</q-btn>

      <div class="row no-wrap q-mt-lg">
        <q-btn label="Отправить" class="q-btn--form" color="primary" @click="handleCreateWebinar()" />
        <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

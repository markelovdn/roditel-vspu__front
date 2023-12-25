<script setup lang="ts">
import { onMounted, ref } from "vue";

import { TWebinarsLector } from "@/api/Webinars/types";
import { useModal } from "@/hooks/useModal";
import { useWebinarsStore } from "@/stores/webinarsStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const emit = defineEmits(["close"]);

const webinarsStore = useWebinarsStore();

const data = ref<TWebinarsLector>({
  id: null,
  lectorName: "",
  lectorDescription: "",
  lectorDepartment: "",
  lectorPhoto: null,
});

const checkFileType = (files: readonly File[] | FileList | null | undefined) => {
  if (!files) {
    return [];
  }

  const fileList = "length" in files ? Array.from(files) : files;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

  const filteredFiles = fileList.filter((file: File) => allowedTypes.includes(file.type));
  return filteredFiles;
};

const { closeModal } = useModal(emit, data);

onMounted(async () => {
  data.value = await webinarsStore.requestLectorInfo(1);
  console.log(data.value);
});
</script>

<template>
  <div>
    <ModalWrapper header="Данные ведущего">
      {{ data }}
      <q-input v-model="data.lectorName" class="q-mb-sm" label="ФИО ведущего" />
      <q-input v-model="data.lectorDepartment" class="q-mb-sm" label="Место работы" />
      <q-input v-model="data.lectorDescription" autogrow class="q-mb-sm" label="Регалии ведущего" />

      <img v-if="data.lectorPhoto" :src="data.lectorPhoto" alt="" />
      <q-file v-model="data.lectorPhoto" accept="image/*" :filter="checkFileType" label="Фото ведущего" />

      <div class="row no-wrap q-mt-lg">
        <q-btn label="Сохранить" class="q-btn--form" color="primary" />
        <q-btn label="Отменить" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped>
.create-checkbox {
  align-items: flex-start;
}
</style>

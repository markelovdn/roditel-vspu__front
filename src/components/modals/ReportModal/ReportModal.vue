<script setup lang="ts">
import { ref } from "vue";

import { useModal } from "@/hooks/useModal";
import { useConsultantStore } from "@/stores/consultantStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const consultantStore = useConsultantStore();
const emit = defineEmits(["close", "showRegistrationModal", "showForgotPasswordModal"]);
const files = ref<File | null>(null);
const { closeModal } = useModal(emit, files);
const showUploadError = ref(false);

const onUploadSuccess = async () => {
  consultantStore.requestReports({ page: "1" });
  closeModal({ force: true });
};

const checkFileType = (files: any) => {
  return files.filter((file: any) => file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
const onUploadFail = () => (showUploadError.value = true);
const handleUpload = () => {
  const data = new FormData();
  if (files.value === null) return;
  data.append("file", files.value as File);
  consultantStore.createReport(data).then(onUploadSuccess, onUploadFail);
};
</script>

<template>
  <div>
    <ModalWrapper header="Добавить данные" sub-header="Подгрузите файлы excel в 1с">
      <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-md">
          <q-file v-model="files" accept=".xlsx" outlined :filter="checkFileType" label="Файл" />
        </div>
        <div class="row no-wrap q-mt-lg">
          <q-btn label="Загрузить" :disable="!files" class="q-btn--form" color="primary" @click="handleUpload" />
          <q-btn
            label="Закрыть"
            class="q-ml-sm q-btn--form"
            flat
            :ripple="false"
            color="grey-1"
            @click="closeModal()" />
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

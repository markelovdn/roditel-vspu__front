<script setup lang="ts">
import { storeToRefs } from "pinia";
import { QTableColumn } from "quasar";
import { computed, onMounted, ref } from "vue";

import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useConsultantStore } from "@/stores/consultantStore";
import notify from "@/utils/notify";

const dateFilter = ref();
const consultantStore = useConsultantStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { reportsModel } = storeToRefs(consultantStore);
const reportsListRows = computed(() => {
  return reportsModelMock.value?.data.map((el) => el);
});
const reportsModelMock = ref({
  data: [
    {
      fileName:
        "Ye jxtym lkbyjt yfpdfybt 'njq inerb/ ye;yj ghjdthbnm xnj ,s cnhjrf kb,j gthtyjcbkfcm? kb,j pfnbhfkfcm'",
      createdAt: "15.12.2000",
      uploadStatus: "success",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
    {
      fileName: "asdaasdsadasdasdasdasdd",
      createdAt: "11.13.2234",
      uploadStatus: "fail",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
    {
      fileName: "rfrjt-nj yfpdfybt lkz ntcnf 'njq ,jhjlf'",
      createdAt: "15.12.2000",
      uploadStatus: "success",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
    {
      fileName: "asdaasdsadasdasdasdasdd",
      createdAt: "11.13.2234",
      uploadStatus: "fail",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
    {
      fileName: "asdad",
      createdAt: "15.12.2000",
      uploadStatus: "success",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
    {
      fileName: "asdaasdsadasdasdasdasdd",
      createdAt: "11.13.2234",
      uploadStatus: "fail",
      fileUrl: "adasdasd/asdasd/asd/as/dasdasdasd",
    },
  ],
});
const reportListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
    width: "58px",
  },
  {
    name: "name",
    label: "Название файла",
    field: "name",
    align: "left",
    width: "auto",
  },
  {
    name: "createdAt",
    label: "Дата загрузки",
    field: "createdAt",
    align: "center",
    width: "100px",
  },
  {
    name: "status",
    label: "Статус",
    //TODO: форматирование статуса
    field: "status",
    align: "center",
    width: "120px",
  },
  {
    name: "saveUrl",
    label: "Скачать",
    //TODO: кнопка скачать
    field: "saveUrl",
    align: "center",
    width: "100px",
  },
] as QTableColumn[];

const handleFileDownload = (fileUrl: string, fileName: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = fileUrl;
  anchorElement.download = fileName;
  anchorElement.click();
  notify({ message: "TODO: скачивание файла" });
};
onMounted(() => {
  //TODO: пагинация
  consultantStore.getReports({ page: "1" });
});
</script>

<template>
  <TableWrapper :items="reportsListRows" :headers="reportListHeaders" :title="'Журналы'">
    <template #header_right>
      <q-btn>Загрузить файл</q-btn>
    </template>
    <template #filters>
      <div class="q-pa-md" style="max-width: 300px">
        <q-input v-model="dateFilter" dense filled>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFilter" range>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </template>
    <template #item="{ item, index, cellClass }">
      <div :class="cellClass">{{ index + 1 }}</div>
      <div :class="cellClass">{{ item.fileName }}</div>
      <div :class="cellClass">{{ item.createdAt }}</div>
      <div :class="cellClass">{{ item.uploadStatus }}</div>
      <div :class="cellClass">
        <q-btn flat @click="handleFileDownload(item.fileUrl, item.fileName)">
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height="2em"
            width="2em"
            style="overflow: visible">
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
            <path
              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
          </svg>
        </q-btn>
      </div>
    </template>
  </TableWrapper>
</template>

<style lang="scss" scoped></style>

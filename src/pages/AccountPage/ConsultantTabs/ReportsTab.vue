<script setup lang="ts">
import { QTableColumn } from "quasar";
import { onMounted, ref } from "vue";

import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useConsultantStore } from "@/stores/consultantStore";

const dateFilter = ref();
const consultantStore = useConsultantStore();
// const { reportsList } = storeToRefs(consultantStore);
const reportsList = [
  { name: "Файл 1.xls", createdAt: "01.02.2015", status: "UPLOADED", saveUrl: "/asda" },
  {
    name: "Файл ФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайл1.xls",
    createdAt: "01.09.2015",
    status: "NOT_UPLOADED",
    saveUrl: "/as1da",
  },
  {
    name: "Файл ФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайл1.xls",
    createdAt: "01.09.2015",
    status: "NOT_UPLOADED",
    saveUrl: "/as1da",
  },
  {
    name: "Файл ФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайлФайл1.xls",
    createdAt: "01.09.2015",
    status: "NOT_UPLOADED",
    saveUrl: "/as1da",
  },
].map((el, index) => {
  return { ...el, index: index + 1 };
});
const reportListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
  },
  {
    name: "name",
    label: "Название файла",
    field: "name",
    align: "left",
  },
  {
    name: "createdAt",
    label: "Дата загрузки",
    field: "createdAt",
    align: "center",
  },
  {
    name: "status",
    label: "Статус",
    field: "status",
    align: "center",
  },
  {
    name: "saveUrl",
    label: "Скачать",
    field: "saveUrl",
    align: "center",
  },
] as QTableColumn[];
onMounted(() => {
  consultantStore.getReports({ page: "1" });
});
</script>

<template>
  <TableWrapper :items="reportsList" :columns="reportListHeaders" :title="'Журналы'">
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
  </TableWrapper>
</template>

<style lang="scss" scoped></style>

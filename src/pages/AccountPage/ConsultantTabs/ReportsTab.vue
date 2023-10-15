<script setup lang="ts">
import { storeToRefs } from "pinia";
import { QTableColumn } from "quasar";
import { computed, onMounted, ref } from "vue";

import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useConsultantStore } from "@/stores/consultantStore";

const dateFilter = ref();
const consultantStore = useConsultantStore();
const { reportsModel } = storeToRefs(consultantStore);
const reportsListRows = computed(() => {
  return (
    reportsModel.value?.data.map((el, index) => {
      return { ...el, index: index + 1 };
    }) ?? []
  );
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
    //TODO: форматирование статуса
    field: "status",
    align: "center",
  },
  {
    name: "saveUrl",
    label: "Скачать",
    //TODO: кнопка скачать
    field: "saveUrl",
    align: "center",
  },
] as QTableColumn[];
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
    <template #item="{ item, cellClass }">
      <div :class="cellClass">{{ item.index }}</div>
      <div :class="cellClass">{{ item.fileName }}</div>
      <div :class="cellClass">{{ item.createdAt }}</div>
      <div :class="cellClass">{{ item.uploadStatus }}</div>
      <div :class="cellClass">{{ item.fileUrl }}</div>
    </template>
  </TableWrapper>
</template>

<style lang="scss" scoped></style>

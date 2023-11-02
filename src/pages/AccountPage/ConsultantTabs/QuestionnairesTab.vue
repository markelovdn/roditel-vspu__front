<script setup lang="ts">
import { QTableColumn } from "quasar";
import { computed, onMounted, ref } from "vue";

import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";
import notify from "@/utils/notify";

const dateFilter = ref();
const questionnairesStore = useQuestionnairesStore();

const questionnairesListRows = computed(() => {
  return (
    questionnairesStore.questionnaires.map((el, index) => {
      return { ...el, index: index + 1 };
    }) ?? []
  );
});

const handleFileDownload = (fileUrl: string) => {
  console.log(fileUrl);
  notify({ message: "TODO: скачивание файла" });
};

const questionnairesListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
  },
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

onMounted(async () => {
  //TODO: пагинация
  questionnairesStore.getQuestionnaires({ page: "1" });
});
</script>

<template>
  <div>
    <router-link :to="'/questionnaires'">
      <q-btn outline style="color: #f7b70b" class="personal-cabinet">
        <IconPersonal />
        <span class="personal-cabinet__label text-primary">Создать анкету</span>
      </q-btn>
    </router-link>
    <TableWrapper :items="questionnairesListRows" :headers="questionnairesListHeaders" :title="'Анкеты'">
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
        <div :class="cellClass">
          <router-link :to="'/questionnaires'">Edit</router-link>
        </div>
        <div :class="cellClass">{{ item.title }}</div>
        <div :class="cellClass">{{ item.title }}</div>
        <div :class="cellClass">{{ item.title }}</div>
        <div :class="cellClass">{{ item.title }}</div>
        <div :class="cellClass">
          <q-btn flat @click="handleFileDownload(item.title)">
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
  </div>
</template>

<style lang="scss" scoped></style>

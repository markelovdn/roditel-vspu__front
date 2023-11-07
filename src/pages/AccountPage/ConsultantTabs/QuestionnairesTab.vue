<script setup lang="ts">
import { QTableColumn } from "quasar";
import { computed, ref } from "vue";

import { TGetConsultantQuestionnairesFilter } from "@/api/Questionnaires/types";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import useAlert from "@/hooks/useAlert";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";

const dateFilter = ref();
const questionnairesStore = useQuestionnairesStore();
const alert = useAlert();
const queryParams = ref<TGetConsultantQuestionnairesFilter>({ page: 1 });
const setPage = (page: number) => (queryParams.value.page = page);

useRequestPayload(queryParams, questionnairesStore.getQuestionnaires, {
  clearableParams: ["page"],
});

const questionnairesListRows = computed(() => {
  return questionnairesStore.questionnaires.map((el) => el);
});

const handleFileDownload = (fileUrl: string, fileName: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = fileUrl;
  anchorElement.download = fileName;
  anchorElement.click();
};

const handleDelete = (questionnaireId: number) => {
  alert({
    confirm: () => {
      deleteQuestionnaire(questionnaireId);
    },
    cancel: () => void 0,
  });
};
const deleteQuestionnaire = (questionnaireId: number) => {
  questionnairesStore.deleteQuestionnaire(Number(questionnaireId));
  const updatedQuestionnairesList = questionnairesStore.questionnaires.filter((item) => item.id !== questionnaireId);
  questionnairesStore.questionnaires = updatedQuestionnairesList;
};

const questionnairesListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "left",
    width: "40px",
  },
  {
    name: "title",
    label: "Название файла",
    field: "title",
    width: "280px",
  },
  {
    name: "updatedAt",
    label: "Дата загрузки",
    field: "updatedAt",
    width: "110px",
  },
  {
    name: "status",
    label: "Статус",
    field: "status",
    width: "110px",
  },
  {
    name: "parented",
    label: "Родитель",
    field: "parented",
    width: "110px",
  },
  {
    name: "fileUrl",
    label: "Скачать",
    field: "fileUrl",
    width: "110px",
  },
  {
    name: "edit",
    label: "",
    field: "edit",
    width: "40px",
  },
  {
    name: "delete",
    label: "",
    field: "delete",
    width: "40px",
  },
] as QTableColumn[];
</script>

<template>
  <div>
    <TableWrapper :items="questionnairesListRows" :headers="questionnairesListHeaders" :title="'Анкеты'">
      <template #header_right>
        <router-link :to="'/questionnaires'">
          <q-btn outline style="color: #f7b70b" class="personal-cabinet">
            <span class="personal-cabinet__label text-primary">Создать анкету</span>
          </q-btn>
        </router-link>
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
        <div :class="cellClass" class="justify-center">{{ item.title }}</div>
        <div :class="cellClass" class="justify-center">{{ item.updatedAt }}</div>
        <div :class="cellClass" class="justify-center">
          <span v-if="item.status === undefined">Ожидает ответа</span>
          <span>Ответ от {{ item.status }}</span>
        </div>
        <div :class="cellClass" class="justify-center">
          <span v-if="!item.parented">Не назначено</span>
          <span>{{ item.parented }}</span>
        </div>
        <div :class="cellClass">
          <q-btn flat @click="handleFileDownload(String(item.fileUrl), String(item.fileName))">
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
        <div :class="cellClass" class="flex gap-1 justify-end">
          <div>
            <q-btn v-if="item.id" dense icon="edit" size="xs" color="primary" :to="`/questionnaire/${item.id}`"></q-btn>
          </div>
        </div>
        <div :class="cellClass" class="flex gap-1 justify-end">
          <div>
            <q-btn v-if="item.id" dense size="xs" icon="delete" color="negative" @click="handleDelete(item.id)"></q-btn>
          </div>
        </div>
      </template>
    </TableWrapper>
    <div class="q-pa-lg">
      <div class="q-gutter-md">
        <q-pagination
          v-model="questionnairesStore.page.current"
          :max="questionnairesStore.page.max"
          :max-pages="6"
          direction-links
          gutter="8px"
          active-color="yellow"
          @update:model-value="setPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

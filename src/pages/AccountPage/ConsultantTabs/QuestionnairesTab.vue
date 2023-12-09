<script setup lang="ts">
import { computed, ref } from "vue";

import { TGetConsultantQuestionnairesFilter } from "@/api/Questionnaires/types";
import ConsultantChoiceParentsModal from "@/components/modals/ConsultantChoiceParentsModal/ConsultantChoiceParentsModal.vue";
import TableWrapper, { TTableWrapperHeaders } from "@/components/TableWrapper/TableWrapper.vue";
import useAlert from "@/hooks/useAlert";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";
import handleFileDownload from "@/utils/handlers";

import { type TDateFilter } from "./types";

const questionnairesStore = useQuestionnairesStore();
const dateFilter = ref<TDateFilter | null>();
const alert = useAlert();

const questionId = ref<number>(0);

const parentsModal = ref(false);
const queryParams = ref<TGetConsultantQuestionnairesFilter>({ page: 1 });
const setPage = (page: number) => (queryParams.value.page = page);
const filterStatusSelect = [
  { value: "", label: "Все" },
  { value: "answered", label: "Отвеченные" },
  { value: "notAnswered", label: "Ожидает ответа" },
];
const statusFilter = ref("");

const questionnairesListRows = computed(() => {
  return questionnairesStore.questionnaires;
});

useRequestPayload(queryParams, questionnairesStore.getQuestionnaires, {
  clearableParams: { page: 1 },
});
const setDataFilter = (value?: any) => {
  if (value) {
    queryParams.value.dateBetween = `${value.from}, ${value.to}`;
  } else {
    delete queryParams.value["dateBetween"];
  }
};

const setStatusFilter = (value?: any) => {
  if (value != "") {
    queryParams.value.status = value;
  } else {
    delete queryParams.value["status"];
  }
};

const dateClear = () => {
  dateFilter.value = null;
  setDataFilter();
};

const dateToString = computed(() =>
  dateFilter.value ? `c ${dateFilter.value.from} по ${dateFilter.value.to}` : "Выберите дату",
);

const handleModal = (value?: number | null) => {
  parentsModal.value = true;
  questionId.value = value as number;
};

const handleDelete = (questionnaireId: number) => {
  alert({
    confirm: () => {
      deleteQuestionnaire(questionnaireId);
    },
    cancel: () => void 0,
  });
};

//TODO: временный метод для тестирования
const questionaireToParented = (questionnaireId: number | string | null | undefined) => {
  questionnairesStore.setQuestionnaireToParented(questionnaireId);
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
] as unknown as TTableWrapperHeaders;
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
        <div class="q-pa-md row no-wrap" style="max-width: 300px">
          <q-input v-model="dateToString" dense filled>
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateFilter" range @update:model-value="setDataFilter">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Закрыть" color="primary" flat />
                      <q-btn v-close-popup label="Сбросить" color="primary" flat @click="dateClear()" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            v-model="statusFilter"
            input-class="q-select--form"
            label="Статус*"
            outlined
            :options="filterStatusSelect"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @update:model-value="(value) => setStatusFilter(value)" />
        </div>
      </template>
      <template #item="{ item, index }">
        <div>{{ index + 1 }}</div>
        <div>{{ item.title }}</div>
        <div>{{ item.updatedAt }}</div>
        <div>
          <span v-if="!item.status">Ожидает ответа</span>
          <span v-else>Ответ от {{ item.status }}</span>
        </div>
        <div :class="cellClass" class="justify-center">
          <q-btn
            v-if="!item.parented"
            outline
            rounded
            color="primary"
            label="Назначить"
            class="appoint-btn"
            @click="handleModal(item.id)" />
        <div>
          <span>{{ item.parented }}</span>
        </div>
        <div>
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
        <div class="flex gap-1 justify-end">
          <div>
            <q-btn v-if="item.id" dense icon="edit" size="xs" color="primary" :to="`/questionnaire/${item.id}`"></q-btn>
          </div>
        </div>
        <div class="flex gap-1 justify-end">
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
    <ConsultantChoiceParentsModal v-if="parentsModal" :question-id="questionId" @close="parentsModal = false" />
  </div>
</template>

<style lang="scss" scoped>
.filters {
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 20px;

  &__date {
    align-self: center;
    margin-top: 10px;
  }

  &__status {
    width: 50px;
  }
}

.appoint-btn {
  padding: 4px 6px;
  font-size: 12px;
  height: auto;
}
</style>

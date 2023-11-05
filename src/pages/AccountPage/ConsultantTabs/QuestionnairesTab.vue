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

const deleteQuestionnaire = (questionnaireId: number) => {
  alert({
    confirm: () => {
      questionnairesStore.deleteQuestionnaire(Number(questionnaireId));
      const updatedQuestionnairesList = questionnairesStore.questionnaires.filter(
        (item) => item.id !== questionnaireId,
      );
      questionnairesStore.questionnaires = updatedQuestionnairesList;
    },
    cancel: () => void 0,
  });
};

const questionnairesListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "left",
  },
  {
    name: "title",
    label: "Название файла",
    field: "title",
  },
  {
    name: "updatedAt",
    label: "Дата загрузки",
    field: "updatedAt",
  },
  {
    name: "description",
    label: "Описание",
    //TODO: форматирование статуса
    field: "description",
  },
  {
    name: "actions",
    label: "",
    field: "actions",
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
        <div :class="cellClass" class="justify-center">{{ item.description }}</div>
        <div :class="cellClass" class="flex gap-1 justify-end">
          <div>
            <q-btn v-if="item.id" dense icon="edit" size="xs" color="primary" :to="`/questionnaire/${item.id}`"></q-btn>
          </div>
          <div>
            <q-btn
              v-if="item.id"
              dense
              size="xs"
              icon="delete"
              color="negative"
              @click="deleteQuestionnaire(item.id)"></q-btn>
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

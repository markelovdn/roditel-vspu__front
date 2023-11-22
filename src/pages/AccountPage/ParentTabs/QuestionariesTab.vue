<script setup lang="ts">
import { computed, ref } from "vue";

import { TGetConsultantQuestionnairesFilter } from "@/api/Questionnaires/types";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { TTableWrapperHeaders } from "@/components/TableWrapper/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";

const questionnairesStore = useQuestionnairesStore();

const queryParams = ref<TGetConsultantQuestionnairesFilter>({ page: 1 });
const setPage = (page: number) => (queryParams.value.page = page);

const questionnairesListRows = computed(() => {
  return questionnairesStore.questionnaires;
});

useRequestPayload(queryParams, questionnairesStore.getQuestionnaires, {
  clearableParams: ["page"],
});

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
    width: "350px",
  },
  {
    name: "consultant",
    label: "От кого",
    field: "consultant",
    width: "110px",
  },
  {
    name: "updatedAt",
    label: "Дата",
    field: "updatedAt",
    width: "110px",
  },
  {
    name: "timeToAnswer",
    label: "Время на ответ",
    field: "timeToAnswer",
    width: "110px",
  },
  {
    name: "toAnswer",
    label: "",
    field: "toAnswer",
    width: "110px",
  },
] as unknown as TTableWrapperHeaders;
</script>

<template>
  <div>
    <TableWrapper :items="questionnairesListRows" :headers="questionnairesListHeaders" :title="'Анкеты'">
      <template #header_right></template>
      <template #filters></template>
      <template #item="{ item, index, cellClass }">
        <div :class="cellClass">{{ index + 1 }}</div>
        <div :class="cellClass" class="justify-center">{{ item.title }}</div>
        <div :class="cellClass" class="justify-center">{{ item.consultant }}</div>
        <div :class="cellClass" class="justify-center">{{ item.updatedAt }}</div>
        <div :class="cellClass" class="justify-center">{{ item.answerBefore }}</div>
        <div :class="cellClass">
          <router-link :to="`/answerParentedQuesstionaire/${item.id}`">
            <span>Ответить</span>
          </router-link>
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
</style>

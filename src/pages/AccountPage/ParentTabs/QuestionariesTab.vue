<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { TGetConsultantQuestionnairesFilter } from "@/api/Questionnaires/types";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { TTableWrapperHeaders } from "@/components/TableWrapper/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useScrollControl } from "@/hooks/useScrollControl";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";

const questionnairesStore = useQuestionnairesStore();

const queryParams = ref<TGetConsultantQuestionnairesFilter>({ page: 1 });
const { scrollToTop } = useScrollControl();
const setPage = (page: number) => {
  queryParams.value.page = page;
  scrollToTop(300);
};

const questionnairesListRows = computed(() => {
  return questionnairesStore.questionnaires;
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
    width: "300px",
  },
  {
    name: "consultant",
    label: "От кого",
    field: "consultant",
    width: "140px",
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

onMounted(() => {
  useRequestPayload(queryParams, questionnairesStore.getQuestionnaires, {
    // clearableParams: ["page"],
  });
});
</script>

<template>
  <div>
    <TableWrapper :items="questionnairesListRows" :headers="questionnairesListHeaders" :title="'Анкеты'">
      <template #header_right></template>
      <template #filters></template>
      <template #item="{ item, index }">
        <div>{{ index + 1 }}</div>
        <div>{{ item.title }}</div>
        <div>{{ item.consultant }}</div>
        <div>{{ item.updatedAt }}</div>
        <div>{{ item.answerBefore }}</div>
        <div class="answer-btn-cell">
          <q-btn
            flat
            :padding="'xs'"
            :disable="item.status !== null"
            color="primary"
            :to="`/answerParentedQuesstionaire/${item.id}`">
            Ответить
          </q-btn>
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
          class="pagination"
          active-color="yellow"
          @update:model-value="setPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.answer-btn-cell {
  // background: #ecedf3;
}
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

.pagination {
  :deep(.q-btn) {
    height: 24px;
  }
  :deep(.q-icon) {
    font-size: 18px;
  }
}
</style>

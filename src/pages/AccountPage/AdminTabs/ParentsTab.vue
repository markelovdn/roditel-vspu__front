<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { TGetParentedsForAdminFilter } from "@/api/Admin/types";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { TTableWrapperHeaders } from "@/components/TableWrapper/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useParentedsAdminStore } from "@/stores/adminStore/parentedsAdminStore";

const parentedAdminStore = useParentedsAdminStore();

const queryParams = ref<TGetParentedsForAdminFilter>({ page: 1 });
const setPage = (page: number) => (queryParams.value.page = page);

const deleteParented = (parentedId: number) => {
  if (confirm("Вы уверены, что хотите удалить данного родителя?")) {
    parentedAdminStore.deleteParented(parentedId);
  }
};

const parentedsListRows = computed(() => {
  return parentedAdminStore.parenteds;
});

onMounted(() => {
  useRequestPayload(queryParams, parentedAdminStore.requestAllParenteds, { clearableParams: { page: 1 } });
});
const consultantsListHeaders = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "left",
    width: "50px",
  },
  {
    name: "fullName",
    label: "ФИО",
    field: "fullName",
    width: "280px",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    width: "150px",
  },
  {
    name: "trash",
    label: "",
    field: "trash",
    width: "50px",
  },
] as unknown as TTableWrapperHeaders;
</script>

<template>
  <div>
    <TableWrapper :items="parentedsListRows" :headers="consultantsListHeaders" :title="'Родители'">
      <template #header_right></template>
      <template #filters>
        <div class="q-pa-md row no-wrap" style="max-width: 300px"></div>
      </template>
      <template #item="{ item, index }">
        <div>{{ index + 1 }}</div>
        <div>{{ item.fullName }}</div>
        <div>{{ item.email }}</div>
        <div>
          <q-btn icon="delete" color="negative" size="xs" @click="deleteParented(item.parentedId)"></q-btn>
        </div>
      </template>
    </TableWrapper>
    <div class="q-pa-lg">
      <div class="q-gutter-md">
        <q-pagination
          v-model="parentedAdminStore.page.current"
          :max="parentedAdminStore.page.max"
          :max-pages="10"
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
.photo {
  height: 60px;
  border-radius: 5px;
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

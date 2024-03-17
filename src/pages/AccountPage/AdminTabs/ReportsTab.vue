<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { TGetConsultantReportsFilter } from "@/api/Consultant/types";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { TTableWrapperHeaders } from "@/components/TableWrapper/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useScrollControl } from "@/hooks/useScrollControl";
import { useConsultantStore } from "@/stores/consultantStore";
import notify from "@/utils/notify";

const consultantStore = useConsultantStore();
const { scrollToTop } = useScrollControl();
const { reportsModel } = storeToRefs(consultantStore);
const reportsListRows = computed(() => {
  return reportsModel.value?.data.map((el) => el) || [];
});
const paginationPage = ref(1);
const inputDate = ref();

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
    align: "center",
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
    name: "saveUrl",
    label: "Скачать",
    field: "saveUrl",
    align: "center",
    width: "100px",
  },
] as unknown as TTableWrapperHeaders;

const queryParams = ref<TGetConsultantReportsFilter>({ page: 1 });
const dateToString = computed(() =>
  inputDate.value ? `c ${inputDate.value.from} по ${inputDate.value.to}` : "Выберите дату",
);
const dateClear = () => {
  inputDate.value = null;
  setData();
};
const setData = (value?: any) => {
  if (value) {
    queryParams.value.dateBetween = `${value.from}, ${value.to}`;
  } else {
    delete queryParams.value["dateBetween"];
  }
};

const setPage = (page: number) => {
  queryParams.value.page = page;
  scrollToTop(300);
};
const handleFileDownload = (fileUrl: string, fileName: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = fileUrl;
  anchorElement.download = fileName;
  anchorElement.target = "_blank";
  anchorElement.click();
  notify({ message: "TODO: скачивание файла" });
};

onMounted(() => {
  useRequestPayload(queryParams, consultantStore.getReportsForAdmin, { clearableParams: { page: 1 } });
});
</script>

<template>
  <TableWrapper :items="reportsListRows" :headers="reportListHeaders" :title="'Журналы'">
    <template #header_right>
      <div class="q-pa-md" style="max-width: 300px">
        <q-input v-model="dateToString" outlined>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="inputDate" range @update:model-value="setData">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Закрыть" color="primary" flat />
                    <q-btn v-close-popup label="Сбросить" color="primary" flat @click="dateClear()" />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </template>
    <template #item="{ item, index }">
      <div class="justify-center items-center">{{ index + 1 }}</div>
      <div class="items-center">{{ item.fileName }}</div>
      <div class="justify-center items-center">{{ item.createdAt }}</div>
      <div class="justify-center items-center">
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
    <template #pagination>
      <div class="q-pa-lg">
        <div class="q-gutter-md">
          <q-pagination
            v-model="paginationPage"
            :max="consultantStore.reportsModel?.meta.totalPages || 1"
            :max-pages="6"
            direction-links
            gutter="8px"
            class="pagination"
            active-color="yellow"
            @update:model-value="setPage" />
        </div>
      </div>
    </template>
  </TableWrapper>
</template>

<style lang="scss" scoped>
.error {
  color: var(--error, #d00);
  white-space: nowrap;
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

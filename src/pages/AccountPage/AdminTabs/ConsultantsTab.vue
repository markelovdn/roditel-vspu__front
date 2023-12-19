<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { TGetConsultantsForAdminFilter } from "@/api/Admin/types";
import ConsultantContractModal from "@/components/modals/ConsultantContractModal/ConsultantContractModal.vue";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { TTableWrapperHeaders } from "@/components/TableWrapper/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useConsultantsAdminStore } from "@/stores/adminStore/consultantsAdminStore";

const consultantAdminStore = useConsultantsAdminStore();

const queryParams = ref<TGetConsultantsForAdminFilter>({ page: 1 });
const setPage = (page: number) => (queryParams.value.page = page);
const showModalUpdateContractNumber = ref(false);
const consultantId = ref(0);
const consultantModelData = ref({
  consultantId: consultantId,
  contractNumber: "",
});

const deleteConsultant = (consultantId: number) => {
  consultantAdminStore.deleteConsultant(consultantId);
};

const consultantsListRows = computed(() => {
  return consultantAdminStore.consultants;
});

onMounted(() => {
  useRequestPayload(queryParams, consultantAdminStore.requestAllConsultants, { clearableParams: { page: 1 } });
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
    name: "photo",
    label: "Фото",
    field: "photo",
    width: "80px",
  },
  {
    name: "fullName",
    label: "ФИО",
    field: "fullName",
    width: "280px",
  },
  {
    name: "contractNumber",
    label: "Номер договора",
    field: "contractNumber",
    width: "110px",
  },
  {
    name: "contractNumberEdit",
    label: "",
    field: "",
    width: "25px",
  },
  {
    name: "specialization",
    label: "Специализация",
    field: "specialization",
    width: "150px",
  },
  {
    name: "phone",
    label: "Телефон",
    field: "phone",
    width: "150px",
  },
  {
    name: "",
    label: "",
    field: "",
    width: "25px",
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
    <TableWrapper :items="consultantsListRows" :headers="consultantsListHeaders" :title="'Консультанты'">
      <template #header_right></template>
      <template #filters>
        <div class="q-pa-md row no-wrap" style="max-width: 300px"></div>
      </template>
      <template #item="{ item, index }">
        <div>{{ index + 1 }}</div>
        <div>
          <q-img class="photo" :src="item.photo" />
        </div>
        <div>{{ item.fullName }}</div>
        <div>{{ item.contractNumber }}</div>
        <div>{{ item.phone }}</div>
        <div>
          <q-btn
            dense
            icon="edit"
            color="primary"
            size="xs"
            @click="
              (showModalUpdateContractNumber = true),
                (consultantModelData.consultantId = item.consultantId),
                (consultantModelData.contractNumber = item.contractNumber)
            "></q-btn>
        </div>
        <div>{{ item.fullName }}</div>
        <div>{{ item.contractNumber }}</div>
        <div>
          <q-btn dense icon="delete" color="negative" size="xs" @click="deleteConsultant(item.consultantId)"></q-btn>
        </div>
        <div>{{ item.specializationTitle }}</div>
        <div>{{ item.phone }}</div>
      </template>
    </TableWrapper>
    <div class="q-gutter-md q-pa-lg">
      <q-pagination
        v-model="consultantAdminStore.page.current"
        :max="consultantAdminStore.page.max"
        :max-pages="10"
        direction-links
        gutter="8px"
        active-color="yellow"
        @update:model-value="setPage" />
    </div>
  </div>
  <ConsultantContractModal
    v-if="showModalUpdateContractNumber"
    :consultant-data="consultantModelData"
    @close="showModalUpdateContractNumber = false" />
</template>

<style lang="scss" scoped>
.photo {
  height: 60px;
  border-radius: 5px;
}
</style>

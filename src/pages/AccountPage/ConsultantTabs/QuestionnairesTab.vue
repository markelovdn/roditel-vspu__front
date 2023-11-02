<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { type TQuestionnairesData } from "@/pages/AccountPage/ConsultantTabs/types";
// import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useConsultantStore } from "@/stores/consultantStore";
import { useQuestionnairesStore } from "@/stores/questionnairesStore";
// import notify from "@/utils/notify";

// const dateFilter = ref();
const consultantStore = useConsultantStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { reportsModel } = storeToRefs(consultantStore);
const questionnairesStore = useQuestionnairesStore();

// const questionnairesListRows = computed(() => {
//   return (
//     questionnairesData.value?.data.map((el, index) => {
//       return { ...el, index: index + 1 };
//     }) ?? []
//   );
// });

const questionnairesData = ref<TQuestionnairesData>({
  data: [],
});

onMounted(() => {
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
    <!-- <TableWrapper :items="" :headers="">

  </TableWrapper> -->
    {{ questionnairesData }}
  </div>
</template>

<style lang="scss" scoped></style>

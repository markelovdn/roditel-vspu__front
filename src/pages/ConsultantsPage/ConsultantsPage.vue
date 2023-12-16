<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { TGetConsultationsFilter } from "@/api/Consultations/types";
import ConsultantsCard from "@/components/common/Home/ConsultantsCard/ConsultantsCard.vue";
import type { Consultant } from "@/components/common/Home/ConsultantsCard/types";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useScrollControl } from "@/hooks/useScrollControl";
import { useConsultantStore } from "@/stores/consultantStore";

const consultantStore = useConsultantStore();
const queryParams = ref<TGetConsultationsFilter>({ page: 1 });
const search = ref("");
const { scrollToTop } = useScrollControl();
const setPage = (page: number) => {
  queryParams.value.page = page;
  scrollToTop(300);
};
let searchTimeoutId: ReturnType<typeof setTimeout>;

watch(search, () => {
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => {
    queryParams.value.search = search.value;
  }, 300);
});

onMounted(() => {
  useRequestPayload(queryParams, consultantStore.requestConsultants, {});
});
</script>

<template>
  <div class="container">
    <div class="search">
      <q-input v-model="search" outlined bottom-slots class="q-pb-none">
        <template #append>
          <q-icon v-if="search !== ''" name="close" class="cursor-pointer" />
          <q-icon name="search" style="cursor: pointer" />
        </template>
      </q-input>
    </div>
    <div v-if="consultantStore.consultants.length" class="content">
      <ConsultantsCard
        v-for="(consultant, index) in consultantStore.consultants"
        :key="index"
        :consultant="consultant as Consultant"
        :back-ground-color="'#fff'" />
    </div>
    <div class="q-pa-lg">
      <div class="q-gutter-md">
        <q-pagination
          v-model="consultantStore.page.current"
          :max="consultantStore.page.max"
          :max-pages="6"
          direction-links
          gutter="8px"
          active-color="yellow"
          @update:model-value="setPage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  /* padding: 0 75px; */
}

.content {
  margin-top: 60px;
  /* width: 100%; */
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(360px, 358px));
  gap: 40px;
  justify-items: stretch;
  justify-content: space-between;
}
</style>

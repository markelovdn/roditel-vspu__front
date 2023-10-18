<script setup lang="ts">
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
webinarsStore.clearFilters();
webinarsStore.requestWebinars({});
const setPage = (page: number) => webinarsStore.requestWebinars({ page });
</script>

<template>
  <div>
    <TableWrapper :items="webinarsStore.webinars" :title="'Вебинары'">
      <template #item="item">
        <WebinarCard :webinar-item="item" />
      </template>
    </TableWrapper>

    <div class="q-pa-lg">
      <div class="q-gutter-md">
        <q-pagination
          v-model="webinarsStore.page.current"
          :max="webinarsStore.page.max"
          :max-pages="6"
          direction-links
          gutter="20px"
          @update:model-value="setPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

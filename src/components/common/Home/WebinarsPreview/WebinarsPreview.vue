<script setup lang="ts">
import { ref } from "vue";

import { TWebinarsRequestOption } from "@/api/Webinars/types";
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useWebinarsStore } from "@/stores/webinarsStore";

import WebinarsFilter from "./WebinarsFilter.vue";

const queryParams = ref<TWebinarsRequestOption>({ page: 1 });
const webinarsStore = useWebinarsStore();

const setFilters = (filters: TWebinarsRequestOption, page: number) => {
  queryParams.value = { ...filters, page };
};

useRequestPayload(queryParams, webinarsStore.requestWebinars, {
  // clearableParams: { page: 1 },
  // watchParams: ["page"],
});
</script>

<template>
  <div id="webinarsAnchor" class="webinars-container">
    <div class="webinars-container__header">
      <h2>Вебинары</h2>
      <WebinarsFilter @set-filters="setFilters($event, queryParams.page)" />
    </div>
    <div class="webinars-container__cards">
      <WebinarCard v-for="(item, index) in webinarsStore.webinars" :key="index" :item="item" :type="'grid'" />
    </div>
    <div class="q-pa-lg">
      <div class="q-gutter-md">
        <q-pagination
          v-model="webinarsStore.page.current"
          :max="webinarsStore.page.max"
          :max-pages="6"
          direction-links
          gutter="8px"
          class="pagination"
          active-color="yellow"
          @update:model-value="setFilters(queryParams, $event)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.webinars-container {
  padding: 74px 76px;
  border-radius: 30px;
  background: var(--background-card);

  @media screen and (max-width: $mobile-max-width) {
    padding: 30px 10px;
  }

  &__cards {
    display: grid;
    grid-template-columns: auto auto;
    gap: 30px;

    @media screen and (max-width: $mobile-max-width) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;

    @media screen and (max-width: $mobile-max-width) {
      h2 {
        font-size: 32px;
      }
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
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

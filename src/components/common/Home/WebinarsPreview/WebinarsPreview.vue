<script setup lang="ts">
import { ref } from "vue";

import { TWebinarsRequestOption } from "@/api/Webinars/types";
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";
import { useRequestPayload } from "@/utils/composable/useRequestPayload";

import WebinarsFilter from "./WebinarsFilter.vue";
const queryParams = ref<TWebinarsRequestOption>({});
const webinarsStore = useWebinarsStore();
webinarsStore.clearFilters();
webinarsStore.requestWebinars({});
const setPage = (page: number) => (queryParams.value.page = page);
const setFilters = (filters: TWebinarsRequestOption) => Object.assign(queryParams.value, filters);

useRequestPayload(queryParams, webinarsStore.requestWebinars, { clearableParams: [""], watchParams: ["date"] });
</script>

<template>
  <div class="webinars-container">
    <div class="webinars-container__header">
      <h2>Вебинары</h2>
      <WebinarsFilter @set-filters="setFilters" />
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
          active-color="yellow"
          @update:model-value="setPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.webinars-container {
  padding: 74px 76px;
  border-radius: 30px;
  background: var(--background-card);

  &__cards {
    display: grid;
    grid-template-columns: auto auto;
    gap: 30px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;
  }
}
</style>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { QTableColumn } from "quasar";

import CardTableWrapper from "./CardTableWrapper.vue";
import ListTableWrapper from "./ListTableWrapper.vue";

defineProps<{ items: T[]; title: string; cardsList?: boolean; headers?: Array<QTableColumn & { width: number }> }>();
</script>

<template>
  <div class="table-wrapper">
    <slot name="header">
      <div class="table-wrapper__header">
        <h5>{{ title }}</h5>
        <slot name="header_right"></slot>
      </div>
    </slot>
    <slot name="filters"></slot>
    <div v-if="items.length && !$slots['content']" class="content">
      <CardTableWrapper v-if="cardsList" :items="items">
        <template #item="{ item, index }">
          <slot name="item" v-bind="{ item, index }"></slot>
        </template>
      </CardTableWrapper>
      <ListTableWrapper v-else :items="items" :headers="headers">
        <template #item="{ item, index, cellClass }">
          <slot name="item" v-bind="{ item, index, cellClass }"></slot>
        </template>
      </ListTableWrapper>
    </div>
    <div v-else class="table-wrapper__noData">Данных нет</div>
    <slot name="pagination"></slot>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  background-color: var(--background-table);
  border-radius: 10px;
  box-shadow: 0 4px 35px 0 rgb(46 56 144 / 8%);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 15px 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }
  &__noData {
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
    opacity: 0.4;
  }
}

.content {
  padding: 20px 34px;
}
</style>

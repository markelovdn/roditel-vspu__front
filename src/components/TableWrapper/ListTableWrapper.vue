<script setup lang="ts" generic="T extends Record<string, unknown>">
import { QTableColumn } from "quasar";
import { computed, StyleValue } from "vue";

const props = defineProps<{ items: T[]; headers?: Array<QTableColumn & { width: number }> }>();
const gridTemplateColumnsStyle = computed(() => {
  let columnsWidths = "";
  for (let i = 0; i < (props.headers?.length ?? 0); i++) {
    if (!props.headers?.[i].width) {
      columnsWidths += "1fr";
      continue;
    }
    const width = props.headers?.[i].width;
    columnsWidths += ` minmax(${width}, 1fr)`;
  }
  if (!columnsWidths) return;
  return { "grid-template-columns": columnsWidths } as StyleValue;
});
</script>

<template>
  <div class="listTableWrapper">
    <div v-if="headers && headers.length" class="header table-row" :style="gridTemplateColumnsStyle">
      <div
        v-for="(header, index) in headers"
        :key="index"
        class="table-cell"
        :style="{ 'justify-content': header.align ?? 'center', 'white-space': 'nowrap' }">
        {{ header.label }}
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in items" :key="index" class="table-row content__row" :style="gridTemplateColumnsStyle">
        <slot name="item" v-bind="{ item, index }"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.listTableWrapper {
  // display: grid;
  // grid-template-rows: 1fr;
  width: 100%;
  overflow-x: auto;
  font-weight: 500;
  line-height: 16px;

  // @media screen and (max-width: $mobile-max-width) {
  //   overflow-x: hidden;
  // }
  .header {
    color: #a3a3a3;
    font-size: 12px;
  }
  .table-row {
    display: grid;
    &:nth-child(2n) {
      background: #f9f9fb;
    }
    & > div {
      padding: 16px 14px;
      word-break: break-word;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content {
    color: #525252;
    font-size: 14px;
    border: 1px solid #f1f1f1;
    border-radius: 8px;
    overflow: hidden;
    .table-row {
      height: max-content;
      &:hover > div {
        background: rgba(0, 0, 0, 0.03);
      }
    }
    &__row:nth-child(2n) {
      background: #f9f9fb;
    }
    @media (max-width: 1100px) {
      overflow: unset;
      border: none;
    }
  }
}
</style>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { QTableColumn } from "quasar";
import { computed, StyleValue } from "vue";

const props = defineProps<{ items: T[]; headers?: Array<QTableColumn & { width: number }> }>();
const gridTemplateColumnsStyle = computed(() => {
  let columnsWidths = "";
  for (let i = 0; i < (props.headers?.length ?? 0); i++) {
    const width = props.headers?.[i].width ?? "1fr";
    columnsWidths += ` ${width}`;
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
        <slot name="item" v-bind="{ item, index }" :cell-class="'table-cell'"></slot>
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
  .header {
    color: #a3a3a3;
    font-size: 12px;
  }
  .table-row {
    display: grid;
  }

  .table-cell {
    padding: 16px 14px;
    word-break: break-word;
    display: flex;
  }
  .content {
    color: #525252;
    font-size: 14px;
    border: 1px solid #f1f1f1;
    border-radius: 8px;
    .table-row {
      height: max-content;
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
    &__row:nth-child(2n) {
      background: #f9f9fb;
    }
  }
}
</style>

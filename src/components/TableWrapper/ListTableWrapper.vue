<script setup lang="ts" generic="T extends Record<string, unknown>">
import { QTableColumn } from "quasar";
import { computed, StyleValue } from "vue";

const props = defineProps<{ items: T[]; headers?: QTableColumn[] }>();
const gridTemplateColumnsStyle = computed(() => {
  let columnsWidths = "";
  for (let i = 0; i < (props.headers?.length ?? 0); i++) {
    const width = props.headers ? props.headers[i].width ?? "1fr" : "1fr";
    columnsWidths += ` ${width}`;
  }
  if (!columnsWidths) return;
  return { "grid-template-columns": columnsWidths } as StyleValue;
});
</script>

<template>
  <div class="listTableWrapper">
    <div v-if="headers && headers.length" class="header table-row" :style="gridTemplateColumnsStyle">
      <div v-for="(item, index) in headers" :key="index" class="table-cell">{{ item.label }}</div>
    </div>
    <div class="content">
      <div v-for="(item, index) in items" :key="index" class="table-row" :style="gridTemplateColumnsStyle">
        <slot name="item" v-bind="{ item, index }" :cell-class="'table-cell'"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.listTableWrapper {
  // display: grid;
  // grid-template-rows: 1fr;
  font-weight: 500;
  .header {
    color: #a3a3a3;
    font-size: 12px;
  }
  .table-row {
    display: grid;
  }

  .table-cell {
    padding: 16px 8px;
    word-break: break-word;
  }
  .content {
    color: #525252;
    font-size: 14px;
    .table-row {
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }
}
</style>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { QTableColumn } from "quasar";

defineProps<{ items: T[]; columns: QTableColumn[] }>();
</script>

<template>
  <q-table
    class="listTableWrapper"
    wrap-cells
    hide-bottom
    flat
    :rows="items"
    :columns="columns"
    row-key="index"></q-table>
</template>

<style scoped lang="scss">
.listTableWrapper {
  background: transparent;
  border-radius: 8px;
  border: 1px solid #f1f1f1;
  :deep(.q-table) {
    border-collapse: collapse;
  }
  :deep(.q-table tbody td) {
    word-break: break-word;
  }
  :deep(.q-table tbody tr td),
  :deep(.q-table thead tr th) {
    border-color: transparent;
  }
  :deep(.q-table tbody tr):nth-child(2n) {
    td {
      background: #f9f9fb;
    }
  }
  :deep(.q-table tbody) {
    font-size: 14px;
    font-weight: 500;
    color: #525252;
  }
  :deep(.q-table thead) {
    font-size: 12px;
    font-weight: 500;
    color: #a3a3a3;
  }
}
</style>

<script setup lang="ts">
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import WebinarCard from "@/pages/WebinarsPage/WebinarCard/WebinarCard.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
</script>

<template>
  <div>
    <TableWrapper :items="webinarsStore.webinars" :title="'Вебинары'">
      <template #item="item">
        <WebinarCard :item="item" />
      </template>
    </TableWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

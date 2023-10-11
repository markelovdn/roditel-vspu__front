<script setup lang="ts">
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
</script>

<template>
  <div>
    <TableWrapper :items="webinarsStore.webinars" :title="'Вебинары'">
      <template #item="item">
        <WebinarCard :webinar-item="item" />
      </template>
    </TableWrapper>
  </div>
</template>

<style lang="scss" scoped></style>

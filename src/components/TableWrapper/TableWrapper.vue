<script setup lang="ts" generic="T extends TWebinarCardData">
import { TWebinarCardData } from "@/pages/WebinarsPage/WebinarCard/types";
import CardTableWrapper from "./CardTableWrapper.vue";
// import ListTableWrapper from "./ListTableWrapper.vue";

// defineProps<{ items: Record<string, unknown>[] }>();
defineProps<{ items: T[]; title: string }>();
</script>

<template>
  <div class="table-wrapper">
    <slot name="header">
      <div class="table-wrapper__header">
        <h5>{{ title }}</h5>
        <slot name="header_right"></slot>
      </div>
    </slot>
    <div class="content">
      <CardTableWrapper :items="items">
        <template #item="item">
          <slot name="item" v-bind="item"></slot>
        </template>
      </CardTableWrapper>

      <!-- <ListTableWrapper>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </ListTableWrapper> -->

      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  background-color: var(--background-table);
  border-radius: 10px;
  box-shadow: 0 4px 35px 0 rgb(46 56 144 / 8%);
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 15px 35px;
    background-color: $white;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }
}

.content {
  padding: 20px 34px;
}
</style>
@/pages/WebinarsPage/WebinarCard/types

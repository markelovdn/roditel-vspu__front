<script setup lang="ts" generic="T extends TWebinarCardData">
import { TWebinarCardData } from "@/pages/UserCabinet/WebinarCard/types";
import CardTableWrapper from "./CardTableWrapper.vue";
// import ListTableWrapper from "./ListTableWrapper.vue";

// defineProps<{ items: Record<string, unknown>[] }>();
defineProps<{ items: T[] }>();
</script>

<template>
  <div class="table-wrapper">
    <slot name="header">
      <div class="table-wrapper__header">
        <h5>{title}</h5>
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
  margin-left: 110px;
  border-radius: 10px;
  box-shadow: 0px 4px 35px 0px rgba(46, 56, 144, 0.08);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 35px;
    height: 80px;
    background-color: $white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));
  }
}

.content {
  padding: 20px 34px;
}
</style>

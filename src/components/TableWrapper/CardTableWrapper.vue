<script setup lang="ts" generic="T extends TWebinarCardData">
import { TWebinarCardData } from "@/pages/UserCabinet/WebinarCard/types";

// const props = defineProps<{
//   items: Record<string, unknown>[];
// }>();

defineProps<{ items: T[] }>();
</script>

<template>
  <div class="cardTableWrapper">
    <div v-if="!items.length">Loading...</div>
    <div v-for="item in items">
      <slot name="item" v-bind="item"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

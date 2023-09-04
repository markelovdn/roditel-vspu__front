<script setup lang="ts">
import type { CommonLinkItem } from "./types";

const props = defineProps<CommonLinkItem>();
</script>

<template>
  <a :href="props.to" class="link" :style="`color: var(${props.color})`" target="_blank" rel="">
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.link {
  font-size: 16px;
  color: $grey-2;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>

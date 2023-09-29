<script setup lang="ts">
const props = defineProps<{
  items: Record<string, unknown>[];
}>();
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

<script setup lang="ts" generic="T extends Record<string, unknown>">
defineProps<{ items: T[] }>();
</script>

<template>
  <div class="cardTableWrapper">
    <div v-for="(item, index) in items" :key="index">
      <slot name="item" v-bind="{ item, index }"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
@/components/common/Home/WebinarCard/types

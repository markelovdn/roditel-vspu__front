<script setup lang="ts">
import { ref } from "vue";
import type { Webinar } from "./CardTableWebinar/types";

const props = defineProps<{
  items: Webinar[];
}>();
</script>

<template>
  <div v-if="!items.length">Loading...</div>
  <div v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </div>
</template>

<style scoped lang="scss"></style>

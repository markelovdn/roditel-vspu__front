<script setup lang="ts">
import type { RoutesLayoutName } from "@/router/types";
import { computed } from "vue";
import { useRoute } from 'vue-router';
import TheHomeLayout from '@/layouts/TheHomeLayout.vue'
import TheAppLayout from '@/layouts/TheAppLayout.vue'

const route = useRoute();
const metaLayout = route?.meta?.layout as RoutesLayoutName
const layout = computed(() => {
  switch (route?.meta?.layout) {
    case 'App':
      return TheAppLayout
    case 'Home':
      return TheHomeLayout
    default:
      return 'div'
  }

})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>

<script lang="ts" setup>
import { computedEager } from "@vueuse/core";
//vueuse https://vueuse.org/guide/best-practice.html
computedEager(() => {});
</script>

<template>
  <div class="about">
    <h1><q-btn color="primary">This is quasar btn</q-btn></h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import ChildrenData from "./PersonalDataTab/ChildrenData.vue";
import PersonalData from "./PersonalDataTab/PersonalData.vue";
</script>

<template>
  <div class="wrapper">
    <PersonalData />
    <ChildrenData />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="table-wrapper">
    <div class="table-wrapper__header">
      <h5>{title}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  background-color: $background-table;
  height: 700px;
  margin-left: 110px;

  &__header {
    display: flex;
    align-items: center;
    margin: 15px 35px;
    height: 80px;
    background-color: $background-primary;
  }
}
</style>

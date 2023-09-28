import { TRegistrationRole } from '../../components/modals/RegistrationModal/types';
<script setup lang="ts">
import TableWrapper from "@/components/table/TableWrapper.vue";
</script>

<template>
  <div class="container">
    <div class="title flex">
      <h2>UserName UserName UserName</h2>
      <span class="title_type">userType</span>
      -=icon=-
    </div>
    <div class="content">
      <div class="menu">
        <li>Журналы</li>
        <li>Заявки</li>
        <li>Анкеты</li>
        <li>Персональные данные</li>
      </div>
      <div class="table">
        <TableWrapper />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 70px;
}

.title {
  align-items: end;
  &_type {
    color: $grey-1;
    margin: 0 0 0 24px;

    font-size: 28px;
    font-weight: 700;
    line-height: 120%; /* 33.6px */
  }
}
.content {
  display: flex;
}
.menu {
  width: 300px;
  border: solid 1px black;
}
.table {
  width: 880px;
}
</style>

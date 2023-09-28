import { TRegistrationRole } from '../../components/modals/RegistrationModal/types';
<script setup lang="ts"></script>

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
        <li>Персональные данны</li>
      </div>
      <div class="table"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

.menu {
  width: 300px;
  border: solid 1px black;
}
.table {
  width: 880px;
}
</style>

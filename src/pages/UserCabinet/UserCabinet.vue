import { TRegistrationRole } from '../../components/modals/RegistrationModal/types';
<script setup lang="ts">
import TableWrapper from "@/components/table/TableWrapper.vue";
import IconNotificationsBell from "@/components/icons/IconNotificationsBell.vue";
</script>

<template>
  <div class="container">
    <div class="title flex no-wrap justify-between">
      <div class="flex items-end">
        <h2>UserName UserName UserName</h2>
        <span class="title_type">userType</span>
      </div>

      <div class="notifications flex items-center justify-center">
        <IconNotificationsBell :count="15" />
      </div>
    </div>
    <div class="content flex no-wrap">
      <div class="menu">
        <div class="menu__point menu__point_active">Журналы</div>
        <div class="menu__point">Заявки</div>
        <div class="menu__point">Анкеты</div>
        <div class="menu__point">Персональные данные</div>
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
  &_type {
    color: $grey-1;
    margin: 0 0 0 24px;

    font-size: 28px;
    font-weight: 700;
    line-height: 120%; /* 33.6px */
  }
}
.content {
  margin-top: 52px;
}
.menu {
  width: 300px;

  &__point {
    margin-bottom: 8px;
    padding: 12px 18px;
    border-radius: 7px;
    cursor: pointer;
    color: var(--q-blue-lighter, #315194);
    font-size: 18px;
    line-height: 120%;

    &_active {
      background: var(--white-back, #fff);
      color: var(--black, #313131);
      font-weight: 700;
    }
  }
}

.notifications {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--white-back);
  box-shadow: 0px 4px 35px 0px rgba(46, 56, 144, 0.08);
  cursor: pointer;
}
.table {
  width: 880px;
}
</style>

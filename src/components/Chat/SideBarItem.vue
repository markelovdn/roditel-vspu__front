<script setup lang="ts"></script>

<template>
  <div class="sidebar-item">
    <div class="sidebar-item__box">
      <div class="sidebar-item__status">Новый (15 д.)</div>
      <div class="sidebar-item__date">05.05.23</div>
    </div>
    <div class="sidebar-item__box">
      <div class="sidebar-item__question">Вопрос #13454646</div>
      <div class="sidebar-item__name">Калмыкова Е.Н.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  padding: 22px 20px 22px 36px;
  display: flex;
  gap: 8px;

  // background: rgba(228, 235, 246, 0.2);
  background-color: #ffffff;

  &__box {
    display: flex;
    gap: 4px;
    flex-direction: column;
  }
  &__status {
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }
  &__date {
    color: $grey-2;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }
  &__question {
    color: $Text-color;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }
  &__name {
    color: $grey-1;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }
}
</style>

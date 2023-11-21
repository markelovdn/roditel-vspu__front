<script setup lang="ts"></script>

<template>
  <div class="chat-item">
    <div class="chat-item__wrapper">
      <div class="chat-item__box chat-item__box--customer">
        <div class="chat-item__info">
          <h3 class="chat-item__name">Калмыкова Е.Н.</h3>
          <h4 class="chat-item__spec">Кат. Дошкольники</h4>
        </div>
        <div class="chat-item__content">
          Добрый день, Валентина Сергеевна! Хотела уточнить следующий вопрос касаемо моего ребенка. Добрый день,
          Валентина Сергеевна! Хотела уточнить следующий вопрос касаемо моего ребенка. Добрый день, Валентина Сергеевна!
          Хотела уточнить следующий вопрос касаемо моего ребенка. Добрый день, Валентина Сергеевна!
        </div>
      </div>
      <div class="chat-item__time">01:51</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-item {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 25px 33px 34px;
    background-color: #ffffff;

    &--consultant {
    }
    &--customer {
      border-top-right-radius: 25px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__name {
    margin: 0;
    color: $Blue-lighter;

    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__spec {
    color: $grey-2;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__content {
    color: $Text-color;
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  &__time {
    text-align: right;
    color: #b5bfd6;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }
}
</style>

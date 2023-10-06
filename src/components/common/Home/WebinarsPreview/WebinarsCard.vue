<script setup lang="ts">
import { computed } from "vue";

interface IWebinarsCard {
  webinarItem: {
    img: string;
    title: string;
    category: string;
    date: string | number; //TODO определится с форматом
    lector: string;
    cost: number;
  };
}
const props = defineProps<IWebinarsCard>();
const labels = computed(() => [
  { category: "Категория", value: props.webinarItem.category },
  { category: "Дата и время", value: props.webinarItem.date },
  { category: "Лектор", value: props.webinarItem.lector },
  { category: "Стоимость", value: props.webinarItem.cost ? props.webinarItem.cost + " р" : "бесплатно" },
]);
</script>

<template>
  <div class="card">
    <q-img :src="webinarItem.img" class="card__img" />
    <div class="card__body">
      <div class="card__title">{{ webinarItem.title }}</div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="389"
        height="2"
        viewBox="0 0 389 2"
        fill="none"
        class="card__dividing-line">
        <path opacity="0.2" d="M0.42627 1.00818L388.23 0.999512" stroke="#A3A3A3" />
      </svg>

      <div>
        <div v-for="(item, index) in labels" :key="index" class="info">
          <div class="info__description">{{ item.category }}</div>
          <div class="info__value">{{ item.value }}</div>
        </div>
      </div>
      <q-btn color="primary q-mt-lg">Принять участие</q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid var(--light-grey, #f1f1f1);
  background: var(--q-background-primary);
  padding: 32px 24px;

  &__img {
    height: 90px;
    width: 90px;
    border-radius: 10px;
  }

  &__dividing-line {
    margin: 20px 0;
  }

  &__body {
    width: 388px;
  }

  &__title {
    color: var(--text-color, #525252);
    font-size: 16px;
    line-height: 120%;
  }
}
.info {
  display: grid;
  grid-template-columns: 120px auto;
  font-size: 14px;
  line-height: 16px;
  margin: 0 0 8px 0;

  &__description {
    color: var(--grey-1);
  }
  &__value {
    color: var(--q-Blue-lighter);
  }
}
</style>

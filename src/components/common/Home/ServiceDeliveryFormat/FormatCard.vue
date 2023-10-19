<script setup lang="ts">
import { computed } from "vue";

import ImageBackground from "./ImageBackground.vue";

const props = defineProps<{
  number: number;
  title: string;
  img?: string;
  description?: string;
}>();

const imageUrl = computed(
  () => new URL(`/src/assets/img/ServiceDeliveryFormat/${props.number}.png`, import.meta.url).href,
);
</script>

<template>
  <div class="card-1">
    <span class="card-1__number">{{ number }}.</span>
    <ImageBackground />
    <img class="card-1__image" :src="img || imageUrl" alt="" />
    <div class="card-1__text">
      <h5 class="card-1__text_title">{{ title }}</h5>
      <div v-if="description" class="card-1__text_description">{{ description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-1 {
  position: relative;
  width: 100%;
  height: 362px;
  background: #f5f5f5;
  border: 1px solid $light-grey;
  border-radius: 20px;
  overflow: hidden;
  max-width: 300px;
  min-width: 300px;

  @media screen and (width < 1280px) {
    max-width: 430px;
    margin: 0 auto;
  }

  &__number {
    position: absolute;
    top: 33px;
    left: 33px;
    color: $yellow;
    font-size: 24px;
    font-weight: 700;
  }

  &__image-background {
    position: absolute;
    right: 0;
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__text {
    position: absolute;
    bottom: 36px;
    left: 34px;
    text-align: bottom;
    margin-right: 34px;

    &_title {
    }

    &_description {
      margin-top: 10px;
      color: $grey-1;
      font-size: 16px;
    }
  }
}
</style>

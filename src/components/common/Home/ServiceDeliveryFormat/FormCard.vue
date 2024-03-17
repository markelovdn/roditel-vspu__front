<script setup lang="ts">
import { ref } from "vue";

import ServicesInfoModal from "@/components/modals/ServicesInfoModal/ServicesInfoModal.vue";
defineProps<{
  title: string;
  description: string;
  link: string;
}>();

const isShowModal = ref(false);
</script>

<template>
  <div class="card-2">
    <div class="card-2__title">
      <div class="card-2__title_point"></div>
      <h5>{{ title }}</h5>
    </div>
    <div class="card-2__content">{{ description }}</div>
    <div class="card-2__link" @click="isShowModal = true">Подробнее</div>
    <ServicesInfoModal v-if="isShowModal" @close="isShowModal = false" />
  </div>
</template>

<style lang="scss" scoped>
.card-2 {
  display: flex;
  width: 100%;
  padding: 28px 62px 28px 75px;
  background: var(--background-card);
  border-radius: 20px;
  flex-direction: column;

  @media screen and (max-width: $mobile-max-width) {
    padding: 10px 15px 10px 40px;
  }

  &__title {
    position: relative;

    &_point {
      position: absolute;
      top: 10px;
      left: -25px;
      width: 8px;
      height: 8px;
      background-color: $grey-2;
      border-radius: 50%;
    }
  }

  &__content {
    margin-top: 16px;
    color: $grey-2;
    font-weight: 500;
    line-height: 120%;
  }

  &__link {
    width: max-content;
    margin-top: 16px;
    color: $Blue-lighter;
    cursor: pointer;
    text-decoration: none !important;
  }
}
</style>

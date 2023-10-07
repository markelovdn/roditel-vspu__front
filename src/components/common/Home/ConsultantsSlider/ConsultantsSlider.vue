<script setup lang="ts">
import { onMounted, ref } from "vue";

import { collectionsApi } from "@/api";
import ConsultantsCard from "@/components/common/Home/ConsultantsCard/ConsultantsCard.vue";

import type { Consultant } from "../ConsultantsCard/types";

const slide = ref(0);
const consultants = ref<Consultant[]>([]);
const sliderQuantityItem = 3;

const getConsultants = () => {
  collectionsApi.getConsultants().then((response) => {
    consultants.value = response.data.data;
    consultants.value.push(...response.data.data); // аля моки пока нет пагинации
  });
};

onMounted(() => {
  getConsultants();
});
</script>

<template>
  <div id="consultantsAnchor" class="wrapper">
    <div class="consultants__title">
      <h2 class="">Наши консультанты</h2>
      <div class="consultants__title_subtitle">
        <span>Показать всех</span>
        <svg
          class="consultants__title_underline"
          width="137"
          height="3"
          viewBox="0 0 137 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0.590088 1.70508H136.58" stroke="#F7B70B" stroke-width="2" stroke-dasharray="5 5" />
        </svg>
      </div>
    </div>
    <div class="consultants__carousel">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        infinite
        control-color="primary"
        navigation
        :navigation-position="'bottom'"
        padding
        arrows
        class="carousel">
        <q-carousel-slide
          v-for="(list, slideIndex) in Math.trunc(consultants.length / sliderQuantityItem)"
          :key="list"
          :name="slideIndex">
          <div v-if="consultants.length" class="flex carousel-slide">
            <ConsultantsCard v-for="index in sliderQuantityItem" :key="index" :consultant="consultants[list + index]" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin: 75px 0 70px;
}

.consultants {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_subtitle {
      position: relative;
      color: $Text-color;
      line-height: 120%;
      cursor: pointer;
      font-size: 20px;
    }

    &_underline {
      position: absolute;
      bottom: -6px;
      left: 0;
    }
  }

  &__carousel {
    &:deep(.q-carousel) {
      height: 100%;
    }

    &:deep(.q-carousel .absolute) {
      // position: static;
    }
  }
}

.carousel-slide {
  gap: 32px;
  flex-wrap: nowrap;
}

.carousel {
  cursor: grab;

  &:deep(.q-carousel__navigation-inner) {
    // justify-content: left;
  }

  &:deep(.q-carousel__slide) {
    // padding: 52px 0;
  }

  //что бы на маленьких размерах слайдер оставлася в линию
  &:deep(.q-panel) {
    width: max-content;
  }

  &:deep(.q-carousel__navigation .q-btn) {
    margin: 0 4px;
    padding: 0 5px;
  }

  &:deep(.q-carousel__navigation-icon--active) {
    font-size: 6px !important;
  }

  &:deep(.q-carousel__navigation-icon--inactive) {
    color: #d9d9d9 !important;
    font-size: 5px !important;
  }
}
</style>
../ConsultantsCard/types ./types

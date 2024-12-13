<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import ConsultantsCard from "@/components/common/Home/ConsultantsCard/ConsultantsCard.vue";
import { useConsultantStore } from "@/stores/consultantStore";

const consultantStore = useConsultantStore();
const slide = ref(0);

const sliderQuantityItem = computed(() => {
  if (window.innerWidth < 720) {
    return 1;
  } else {
    return 3;
  }
});
const isLoading = ref(true);

onMounted(() => {
  consultantStore.requestConsultants({ page: 1 }).then(() => (isLoading.value = false));
});
</script>

<template>
  <div id="consultantsAnchor" class="wrapper">
    <div class="consultants__title">
      <h2 class="">Наши консультанты</h2>
      <div class="consultants__title_subtitle">
        <router-link :to="{ name: 'Consultants' }"><span>Показать всех</span></router-link>
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
          v-for="(list, slideIndex) in Math.trunc(consultantStore.consultants.length / sliderQuantityItem)"
          :key="list"
          :name="slideIndex">
          <div v-if="!isLoading" class="flex carousel-slide">
            <ConsultantsCard
              v-for="(item, index) in sliderQuantityItem"
              :key="index"
              :consultant="consultantStore.consultants[slideIndex + index]" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin: 75px 0 70px;

  @media screen and (max-width: $mobile-max-width) {
    margin-top: 30px;
  }
}

.consultants {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: $mobile-max-width) {
      flex-direction: column;
      gap: 8px;
      h2 {
        font-size: 32px;
      }
    }

    &_subtitle {
      position: relative;
      color: $Text-color;
      line-height: 120%;
      cursor: pointer;
      font-size: 20px;

      @media screen and (max-width: $mobile-max-width) {
        font-size: 20px;
      }

      a {
        color: inherit;
        text-decoration: inherit;
      }
    }

    &_underline {
      position: absolute;
      bottom: -6px;
      left: 0;

      @media screen and (max-width: $mobile-max-width) {
        bottom: 0px;
      }
    }
  }

  &__carousel {
    &:deep(.q-carousel) {
      height: 100%;

      @media screen and (max-width: $mobile-max-width) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.carousel-slide {
  gap: 32px;
  flex-wrap: nowrap;
}

.carousel {
  cursor: grab;

  @media screen and (max-width: $mobile-max-width) {
    .q-carousel__slides-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:deep(.q-carousel__slide) {
      align-items: center;
      padding: 52px 0;
    }
    &:deep(.q-carousel__arrow) {
      display: none;
    }
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

<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import type { ConsultantsResponse } from './type';
import type { Consultant } from '../ConsultantsCard/type';
import ConsultantsCard from '@/components/common/Home/ConsultantsCard/ConsultantsCard.vue'

const slide = ref(0)
const consultants = ref<Consultant[]>([])



const getConsultants = async () => {
  await axios
    .get<ConsultantsResponse>("https://markelovdn.ru/api/consultants", {})
    .then((response) => {
      consultants.value = response.data.data
      consultants.value.push(...response.data.data) // аля моки пока нет пагинации
      console.log(consultants.value);
    })
    .catch((errors) => {
      console.log(errors);
    });
};


getConsultants()
</script>

<template>
  <div class="wrapper">
    <h2 class="consultants__title">Наши консультанты</h2>
    <div class="consultants__carousel">
      <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated infinite
        control-color="primary" navigation :navigation-position="'bottom'" padding class="carousel">

        <q-carousel-slide :name="slideIndex" v-for="(list, slideIndex) in Math.trunc(consultants.length / 4)" :key="list">
          <div v-if="consultants.length" class="flex carousel-slide">
            <ConsultantsCard :consultant="consultants[list + index]" v-for="index in 4" :key="index" />
          </div>

        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.wrapper {
  margin: 75px 0 70px;
  width: 130% !important;
}

.consultants {
  &__title {}

  &__carousel {
    &:deep(.q-carousel) {
      height: 100%;
    }

    &:deep(.q-carousel .absolute) {
      position: static;
    }
  }
}

.carousel-slide {
  gap: 32px;
}

.carousel {


  &:deep(.q-carousel__navigation-inner) {
    justify-content: left;
  }

  &:deep(.q-carousel__slide) {
    padding: 52px 0;
    // margin: 52px 0;
  }

  &:deep(.q-carousel__navigation .q-btn) {
    margin: 0 4px;
    padding: 0 5px;
  }

  &:deep(.q-carousel__navigation-icon--active) {
    font-size: 6px !important;
  }

  &:deep(.q-carousel__navigation-icon--inactive) {
    color: #D9D9D9 !important;
    font-size: 5px !important;
  }

}
</style>

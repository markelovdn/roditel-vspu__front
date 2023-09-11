<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import type { ConsultantsResponse } from './type';
import type { Consultant } from '../ConsultantsCard/type';
import ConsultantsCard from '@/components/common/Home/ConsultantsCard/ConsultantsCard.vue'

const slide = ref()
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
    <h2>Наши консультанты</h2>
    <div class="consultants__carousel">

      <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated infinite
        control-color="primary" navigation :navigation-position="'bottom'" padding height="600px" class="">

        <q-carousel-slide :name="list" v-for="list in Math.trunc(consultants.length / 4)" :key="list">
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
  &__title {
    font-size: 42px;
    font-weight: 700;
    line-height: 120%;
  }

  &__carousel {}
}

.carousel-slide {
  gap: 32px
}
</style>

<script setup lang="ts">
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";

import WebinarsFilter from "./WebinarsFilter.vue";

const webinarCard = {
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/7b8c/bd0d/5333c3d8f4b6ce7e014cb747856f0731?Expires=1697414400&Signature=BENIyfgpfp21ceWUibT1HazHEH5BM6Kx8IDDeBaEBlyDBl-Vqbz25Qj8MbFsGmZaxFCCts77WN-U6H-bz4LJS1gjJ9h55JY5IM3bYkzrLJlHddwovhqhkHpq0L1vwUkDu1CFxu2Y46WDqYplLNKmgtiuCAvqsd75e95NGYPXdi6z3WsvuAGEaiYaPxvEriRGJP2aC-DHdLUGglMKXzEk~QFSsD-ym2pBrHNyqHKtgzYcwAj5WAclQgt~-mldeE~BsNbG2xND~-I~4IVlld3pUHe5T9L5vENz-bRpcXEYIiK4Qf6MddZ3XJg9m-yyvZ~ZNtz7IMpWYTkXTF0pTgIcmw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  title:
    "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
  category: "Основная школа",
  date: "19.11.21 c 14:00 до 15:00 (Мск)",
  lector: "Ястребова Гульнара Ахмедовна",
  cost: 300,
};
</script>

<template>
  <div class="webinars-container">
    <div class="webinars-container__header">
      <h2>Вебинары</h2>
      <WebinarsFilter />
    </div>
    <div class="webinars-container__cards">
      <WebinarCard :webinar-item="webinarCard" :type="'grid'" />
      <WebinarCard :webinar-item="webinarCard" :type="'grid'" />
      <WebinarCard :webinar-item="webinarCard" :type="'grid'" />
      <WebinarCard :webinar-item="webinarCard" :type="'grid'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.webinars-container {
  padding: 74px 76px;
  border-radius: 30px;
  background: var(--background-card);

  &__cards {
    display: grid;
    grid-template-columns: auto auto;
    gap: 30px;
  }

  &__header {
    display: flex;
    justify-content: space-around;
  }
}
</style>

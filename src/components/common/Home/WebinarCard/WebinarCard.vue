<script setup lang="ts">
import { computed, ref } from "vue";

import ShortProgram from "@/components/modals/WebinarModal/ShortProgram.vue";

import { TWebinarCardData } from "./types";

interface IWebinarsCard {
  item: TWebinarCardData;
  type?: "grid";
}

const props = defineProps<IWebinarsCard>();
const labels = computed(() => [
  { category: "Категория", value: props.item.category },
  { category: "Дата и время", value: props.item.date },
  {
    category: props.item.lectors?.length > 1 ? "Лекторы" : "Лектор",
    value: props.item.lectors.reduce(
      (acm, item, i, arr) => acm + item.lectorName + (i === arr.length - 1 ? "" : ", "),
      "",
    ),
  },
  { category: "Стоимость", value: props.item.cost ? props.item.cost + " р" : "бесплатно" },
]);
const isShowWebinarModal = ref(false);
</script>

<template>
  <div class="webinar-card q-mb-md">
    <div class="flex no-wrap">
      <div class="webinar-card__image">
        <q-img
          v-if="item.imageUrl"
          :src="item.imageUrl"
          :fit="'cover'"
          :position="'100% 50%'"
          class="webinar-card__image" />
      </div>
      <div class="webinar-card__description q-ml-md">
        <div class="webinar-card__title">{{ item.title }}</div>

        <div class="hr"></div>

        <div v-if="type === 'grid'">
          <div v-for="(label, index) in labels" :key="index" class="info">
            <div class="info__description">{{ label.category }}:</div>
            <div class="info__value">{{ label.value }}</div>
          </div>
          <q-btn color="primary q-mt-lg" @click="isShowWebinarModal = true">Принять участие</q-btn>
        </div>

        <div v-else class="flex justify-between">
          <div>
            <div v-for="(label, index) in labels" :key="index">
              <div v-if="index !== labels.length - 1" class="info">
                <div class="info__description">{{ label.category }}:</div>
                <div class="info__value">{{ label.value }}</div>
              </div>
            </div>
          </div>

          <div class="flex column justify-between">
            <div>
              <div class="info info_right">
                <div class="info__description">{{ labels[labels.length - 1].category }}:</div>
                <div class="info__value">{{ labels[labels.length - 1].value }}</div>
              </div>
            </div>
            <div class="info__link" @click="isShowWebinarModal = true">
              Принять участие
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="q-ml-xs"
                width="21"
                height="14"
                viewBox="0 0 21 14"
                fill="none">
                <g clip-path="url(#clip0_362_6280)">
                  <path
                    d="M11.1147 2.32941C10.9977 2.4466 10.9319 2.60546 10.9319 2.77108C10.9319 2.93671 10.9977 3.09556 11.1147 3.21275L15.2564 7.35441L3.22304 7.35441C3.05728 7.35441 2.89831 7.42026 2.7811 7.53747C2.66389 7.65468 2.59804 7.81365 2.59804 7.97941C2.59804 8.14517 2.66389 8.30415 2.7811 8.42136C2.89831 8.53857 3.05728 8.60441 3.22304 8.60441H15.2564L11.1147 12.7461C11.0324 12.8225 10.9723 12.9196 10.9406 13.0274C10.9089 13.1351 10.9069 13.2493 10.9347 13.3581C10.9625 13.4669 11.0192 13.5661 11.0986 13.6454C11.1781 13.7247 11.2775 13.7811 11.3864 13.8086C11.495 13.8364 11.6092 13.8345 11.7168 13.803C11.8244 13.7714 11.9216 13.7115 11.998 13.6294L17.2064 8.42108C17.3234 8.30389 17.3892 8.14504 17.3892 7.97941C17.3892 7.81379 17.3234 7.65494 17.2064 7.53775L11.998 2.32941C11.8809 2.21237 11.722 2.14663 11.5564 2.14663C11.3908 2.14663 11.2319 2.21237 11.1147 2.32941Z"
                    fill="#F7B70B" />
                </g>
                <defs>
                  <clipPath id="clip0_362_6280">
                    <rect width="13" height="20" fill="white" transform="matrix(0 -1 -1 0 20.5952 13.9585)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShortProgram v-if="isShowWebinarModal" :webinar="item" @close="isShowWebinarModal = false"></ShortProgram>
  </div>
</template>

<style scoped lang="scss">
.webinar-card {
  width: 100%;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--light-grey, #f1f1f1);
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 3%);

  &__image {
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
  &__title {
    color: var(--text-color, #525252);
    font-size: 16px;
    line-height: 120%; /* 19.2px */
  }
  &__description {
    width: 100%;
  }
}
.hr {
  width: 100%;
  margin: 20px 0;
  border-bottom: solid 2px var(--grey-1, #a3a3a3);
  opacity: 0.2;
}
.info {
  display: grid;
  grid-template-columns: 120px auto;
  font-size: 14px;
  line-height: 16px;
  margin: 0 0 8px 0;

  &_right {
    grid-template-columns: 86px auto;
  }

  &__description {
    color: var(--grey-1, #a3a3a3);
  }
  &__value {
    color: var(--q-blue-lighter, #315194);
  }
  &__link {
    color: var(--yellow, #f7b70b);
    font-size: 14px;
    line-height: 16px; /* 114.286% */
    cursor: pointer;
  }
}
</style>

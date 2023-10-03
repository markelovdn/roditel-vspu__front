<script setup lang="ts">
import { TWebinarCardData } from "./types";

defineProps<{
  item: TWebinarCardData;
}>();
</script>

<template>
  <div class="webinar-card q-mb-md">
    <div class="flex no-wrap">
      <q-img :src="item.imageUrl" :fit="'cover'" :position="'100% 50%'" class="webinar-card__image" />
      <div class="webinar-card__description q-ml-md fit">
        <div class="webinar-card__title">{{ item.title }}</div>
        <div class="hr"></div>
        <div class="flex justify-between">
          <div class="flex column justify-between" style="gap: 8px">
            <div class="webinar-card__param">
              Категория:
              <span class="webinar-card__param_value">{{ item.category }}</span>
            </div>
            <div class="webinar-card__param">
              Дата и время:
              <span class="webinar-card__param_value">{{ item.date }}</span>
            </div>
            <div v-if="item.lecturer" class="webinar-card__param">
              Лектор:
              <span class="webinar-card__param_value">{{ item.lecturer }}</span>
            </div>
          </div>
          <div class="flex column justify-between">
            <div class="webinar-card__param">
              Cтоимость:
              <span class="webinar-card__param_value">{{ item.cost }}</span>
            </div>
            <div class="webinar-card__link">
              Принять участие
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
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
  </div>
</template>

<style scoped lang="scss">
.webinar-card {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--light-grey, #f1f1f1);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.03);
  width: 100%;

  &__image {
    border-radius: 10px;
    width: 90px;
    height: 90px;
  }

  &__description {
  }

  &__title {
    color: var(--text-color, #525252);
    font-size: 16px;
    line-height: 120%; /* 19.2px */
  }

  &__param {
    color: var(--grey-1, #a3a3a3);
    font-size: 14px;
    line-height: 16px;

    &_value {
      color: var(--q-Blue-lighter, #315194);
    }
  }

  &__link {
    color: var(--yellow, #f7b70b);
    font-size: 14px;
    line-height: 16px; /* 114.286% */
  }

  .hr {
    width: 100%;
    margin: 20px 0;
    border-bottom: solid 2px var(--grey-1, #a3a3a3);
    opacity: 0.2;
  }
}
</style>

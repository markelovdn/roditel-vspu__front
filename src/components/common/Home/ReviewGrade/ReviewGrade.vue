<template>
  <div class="star-wrapper">
    <div
      v-for="index in props.max"
      :key="index"
      @click="setRating(index)"
      @mouseover="setHoverRating(index)"
      @mouseout="removeHoverRating">
      <StarIcon class="star-grade" :class="{ 'star-grade__chosen': index <= rating || index <= hoverRating }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import StarIcon from "@/assets/img/icons/StarIcon.svg";

interface IProps {
  max: number;
}

const rating = defineModel({
  default: 0,
  required: true,
});

const props = withDefaults(defineProps<IProps>(), {
  max: 5,
});

const hoverRating = ref(0);

const setRating = (value: number) => {
  rating.value = value;
};

const setHoverRating = (value: number) => {
  hoverRating.value = value;
};

const removeHoverRating = () => {
  hoverRating.value = 0;
};
</script>

<style scoped lang="scss">
.star-wrapper {
  display: flex;
  gap: px-to-rem(15px);
}
</style>

<style lang="scss">
.star-grade {
  path {
    stroke: #cedbec;
  }
  cursor: pointer;

  &__chosen {
    path {
      stroke: #ffc850;
    }
  }
}
</style>

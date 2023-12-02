<template>
  <div class="star-wrapper">
    <div
      v-for="index in props.max"
      :key="index"
      class="star-item"
      @click="setRating(index)"
      @mouseover="setHoverRating(index)"
      @mouseout="removeHoverRating">
      <StarIcon class="star-grade" :class="{ 'star-grade__chosen': index <= rating || index <= hoverRating }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import StarIcon from "@/components/icons/IconStar.vue";

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
}

.star-item {
  & + & {
    padding: 0 15px;
  }

  &:first-child {
    padding-right: 15px;
  }

  &:last-child {
    padding-right: 0px;
  }

  cursor: pointer;
}
</style>

<style lang="scss">
.star-grade {
  path {
    fill: #cedbec;
  }
  cursor: pointer;

  &__chosen {
    path {
      fill: #649fed;
    }
  }
}
</style>

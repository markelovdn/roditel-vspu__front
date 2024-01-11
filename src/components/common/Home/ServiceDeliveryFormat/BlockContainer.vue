<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
  type: "form" | "format";
}>();
</script>

<template>
  <div class="block">
    <div class="block__title">
      <h2>{{ title }}</h2>
      <span class="block__title_sub-title">
        {{ description }}
      </span>
    </div>
    <div
      class="block__content"
      :class="{ block__content_format: type === 'format', block__content_form: type === 'form' }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  margin-top: 75px;
  display: flex;
  justify-content: space-between;

  &__title {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: $mobile-max-width) {
      justify-content: center;
      align-items: center;
    }

    &_sub-title {
      width: 541px;
      color: #678570;
      font-size: 16px;
      font-weight: 500;
      line-height: 120%;

      @media screen and (max-width: $mobile-max-width) {
        width: 90%;
        text-align: center;
      }
    }

    @media screen and (max-width: $mobile-max-width) {
      flex-direction: column;
      gap: 8px;
      h2 {
        font-size: 32px;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    margin: 52px 0 0;
    margin-top: 75px;
    gap: 32px;

    @media screen and (width < 1280px) {
      margin-top: 35px;
    }

    &_format {
      @media screen and (width < 1280px) {
        display: grid;
        grid-template-columns: min-content;
        justify-content: space-around;
      }
    }

    &_form {
    }
  }
}

@media screen and (width < 1280px) {
  .block__content {
    flex-wrap: wrap;
  }
}
</style>

<script setup lang="ts">
import { inject } from "vue";

import bannerUrl from "@/assets/img/home-banner.png";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

const authModal = inject(AuthModalInjectionKey, {} as AuthModalProviderData);
</script>

<template>
  <div class="container">
    <div class="container__content content">
      <div class="content__head">Межрегиональная служба консультирования родителей</div>
      <div class="content__sub-head">Методическая и консультационная помощь родителям</div>
      <div class="content__buttons">
        <q-btn color="primary" @click="authModal.toQuestions">
          <div class="btn__label">Задать вопрос специалисту</div>
        </q-btn>
        <q-btn outline class="btn__border" @click="authModal.toOldWebinars">
          <div class="btn__label btn__label_dark">Архив вебинаров</div>
        </q-btn>
        <q-btn color="yellow" @click="authModal.toOldQuestions">
          <div class="btn__label">Оценить качество консультации</div>
        </q-btn>
      </div>
    </div>

    <q-img :src="bannerUrl" :fit="'none'" :position="'100% 50%'" class="container__image" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 694px;
  background: var(--background-card);
  border-radius: 30px;

  &__content {
    position: absolute;
    z-index: 1;
    padding: 152px 0 0 80px;
  }

  &__image {
    z-index: 0;
  }
}

.content {
  &__head {
    width: 686px;
    color: $black;
    font-size: 52px;
    font-weight: 700;
    line-height: 115%;
  }

  &__sub-head {
    padding: 42px 0 0;
    color: $Text-color;
    font-size: 20px;
    opacity: 0.7;
  }

  &__buttons {
    display: grid;
    padding: 60px 0 0;
    grid-template-columns: auto auto;
    gap: 16px;
  }
}

.btn {
  &__label {
    font-size: 16px;

    &_dark {
      color: $grey-1;
    }
  }

  &__border {
    color: $grey-2;
  }
}
</style>

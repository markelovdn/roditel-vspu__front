<script setup lang="ts">
import { inject } from "vue";

import bannerUrl from "@/assets/img/help-banner.png";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

const authModal = inject(AuthModalInjectionKey, {} as AuthModalProviderData);

const content = [
  "Родителям или законным представителям детей дошкольного возраста, не посещающих дошкольные образовательные организации",
  "Родителям или законным представителям, чьи дети находятся на семейном обучении",
  "Родителям или законным представителям детей с ограниченными возможностями здоровья (ОВЗ) и инвалидностью,в первую очередь раннего возраста",
  "Родителям или законным представителям нуждающимся в помощи при воспитании детей, посещающих образовательные организации, но имеющих различные проблемы в поведении, развитии, социализации",
  "Гражданам, желающим принять на воспитание в свои семьи детей, оставшихся без попечения родителей",
];
</script>

<template>
  <div id="helpAnchor" class="banner-container">
    <div class="title">
      <h2>Кому оказывается бесплатная помощь?</h2>
    </div>
    <div class="content">
      <div v-for="text in content" :key="text" class="content__item">
        <div class="content__item_point"></div>
        <div class="content__item_text">{{ text }}</div>
      </div>
      <div class="buttons">
        <a href="tel:+78004442232p771">
          <q-btn color="yellow">
            <div class="btn__label">Записаться очно</div>
          </q-btn>
        </a>

        <q-btn color="primary" @click="authModal.toQuestions">
          <div class="btn__label">Записаться онлайн</div>
        </q-btn>
      </div>
    </div>
    <div class="image">
      <svg width="516" height="462" viewBox="0 0 516 462" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M359.779 48.6277C213.072 -62.0464 77.8779 39.4218 -26.5347 129.888C-113.167 204.949 -177.349 320.158 -112.436 457.769C-48.4934 593.324 98.8561 653.279 227.364 668.137C355.241 682.922 476.411 650.048 502.316 528.848C535.549 373.368 512.843 164.098 359.779 48.6277Z"
          fill="white" />
      </svg>
      <q-img :src="bannerUrl" class="image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 78px 56px 78px 78px;
  background: #f5f5f5;
  border-radius: 30px;
  margin-top: 98px;
  min-height: 768px;
  overflow: hidden;

  @media screen and (max-width: $mobile-max-width) {
    padding: 20px 10px 10px 20px;
    margin-top: 58px;
    flex-direction: column;
  }
}

.title {
  width: 50%;
  @media screen and (max-width: $mobile-max-width) {
    width: 100%;
    font-size: 24px;
    padding-bottom: 10px;
  }

  & > h2 {
    width: 448px;
    @media screen and (max-width: $mobile-max-width) {
      font-size: 24px;
      width: 100%;
    }
  }
}

.content {
  display: grid;
  width: 50%;
  row-gap: 44px;
  @media screen and (max-width: $mobile-max-width) {
    row-gap: 22px;
  }

  &__item {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0 24px;

    &_text {
      color: $Text-color;
      font-size: 20px;
      line-height: 120%;

      @media screen and (max-width: $mobile-max-width) {
        font-size: 18px;
      }
    }

    &_point {
      width: 8px;
      height: 8px;
      background-color: $yellow;
      border-radius: 50%;
      margin-top: 8px;
    }
  }
  @media screen and (max-width: $mobile-max-width) {
    width: 100%;
  }
}

.buttons {
  display: flex;
  gap: 20px;
  margin-left: 32px;
  @media screen and (max-width: $mobile-max-width) {
    margin: 0 10px 5px 5px;
  }
}

.image {
  position: absolute;
  bottom: -5px;
  left: 0;

  @media screen and (max-width: $mobile-max-width) {
    display: none;
  }
}

.btn {
  &__label {
    font-size: 16px;
  }
}
</style>

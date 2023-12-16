<script setup lang="ts">
import { inject } from "vue";

import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const authModal = inject(AuthModalInjectionKey, {} as AuthModalProviderData);
</script>

<template>
  <ModalWrapper :close-button-header="true">
    <div class="info">
      <h3 class="info__header">Запись на оказание услуг</h3>
      <hr />
      <div class="info__block">
        <div class="info__block_title">Вы можете записаться на круглосуточную консультацию:</div>
        <span class="info__block_text">
          <ol>
            <li>Через официальный сайт</li>
            <li>По электронной почте - spc</li>
            <li>По телефонам 8 (800) 444-22-32 (доб. 711), 8 (8442) 60-28-91 с 9:00 до 17:00 часов (Пн.-Пт.)</li>
          </ol>
        </span>
      </div>
      <div class="info__line">
        <div class="info__block info__block_half">
          <div class="info__block_title">График работы диспетчерской службы</div>
          <span class="info__block_text">С понедельника по пятницу С 9:00 до 17:00 Без перерыва на обед</span>
        </div>
        <div class="info__block info__block_half">
          <div class="info__block_title">График работы консультантов</div>
          <span class="info__block_text">
            С понедельника по субботу По предварительной записи В любом формате - очно или онлайн
          </span>
        </div>
      </div>
    </div>
    <hr />
    <div class="warning">
      Проведение консультаций возможно в нерабочие и праздничные дни по предварительной договоренности с получателями
      Услуг.
    </div>
    <a href="tel:+78004442232p771">
      <q-btn class="button" outline style="color: #f7b70b">
        <span class="button__label text-primary">Записаться очно</span>
      </q-btn>
    </a>
    <q-btn class="button" outline style="color: #f7b70b" @click="authModal.toQuestions">
      <span class="button__label text-primary">Записаться онлайн</span>
    </q-btn>
  </ModalWrapper>
</template>

<style lang="scss">
hr {
  margin: 30px 0;
}
.info {
  color: var(--Text-color, #525252);

  font-size: 14px;
  font-weight: 400;
  line-height: 18px;

  &__header {
    color: var(--blue-accent, #253281);
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-transform: uppercase;
  }

  &__block {
    &_half {
      width: 50%;
    }
    &_title {
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      margin: 0 0 16px 0;
    }
    &_text {
      & > ol {
        padding: 0 0 0 20px;
      }
    }
  }
  &__line {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 0 0;
    gap: 20px;
  }
}
.warning {
  color: var(--Blue-lighter, #315194);

  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
}

.button {
  margin: 30px 20px 0 0;
}
</style>

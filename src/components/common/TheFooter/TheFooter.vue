<script setup lang="ts">
import { inject, ref } from "vue";

import logoUrl from "@/assets/img/icons/VGSPU.png";
import CommonLink from "@/components/common/CommonLink/CommonLink.vue";
import { headerMenuItems } from "@/components/common/TheHeader/types";
import IconPhone from "@/components/icons/IconPhone.vue";
import RulesModal from "@/components/modals/RulesModal/RulesModal.vue";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

const authModal = inject(AuthModalInjectionKey, {} as AuthModalProviderData);
const isShowRuleModal = ref(false);
const isAcceptRules = ref(false);
</script>

<template>
  <q-footer class="footer">
    <div class="contentWrapper">
      <div class="footer__col-1">
        <div class="col-1__vgspu">
          <q-img :src="logoUrl" class="col-1__vgspu_img" />
          <div class="col-1__vgspu_title">
            <span>Социально-психологический центр ВГСПУ</span>
          </div>
        </div>
        <q-btn outline class="col-1__btn_border" @click="authModal.toQuestions">
          <div class="col-1__btn_label">Задать вопрос специалисту</div>
        </q-btn>
        <span class="link" @click="isShowRuleModal = true">Политика конфиденциальности</span>
        <RulesModal
          v-if="isShowRuleModal"
          v-model:show="isShowRuleModal"
          v-model:accept="isAcceptRules"
          @close="isShowRuleModal = false" />
      </div>
      <div class="footer__col-2">
        <div class="col-2_links">
          <router-link
            v-for="item in headerMenuItems"
            :key="item.name"
            class="col-2_link btn-link"
            :to="{ name: item.toName, hash: item.hash }">
            {{ item.name }}
          </router-link>
        </div>
        <div class="metodic_material col-2_link btn-link">
          <a
            href="https://bitrix24public.com/b24-l12664.bitrix24.ru/docs/pub/8ceb665e20b23b3aa5b2f0444d4069f4/default/?&"
            target="_blank"
            rel="Методические материалы">
            Методические материалы
          </a>
        </div>
      </div>
      <div class="footer__col-3">
        <span class="text-primary col-3__link" :to="'https://ya.ru/'">
          Для жителей Волгограда и Волгоградской области возможны очные консультации по адресу г.Волгоград, проспект
          Ленина, 27
        </span>
        <CommonLink
          :to="'https://bitrix24public.com/b24-l12664.bitrix24.ru/docs/pub/259c2a702e5b56107f15299be4997cc6/default/?&/'">
          Приказ Об утверждении Положения о Межрегиональной службе консультирования родителей социально -
          психологическим центром "ВГСПУ"
        </CommonLink>
        <CommonLink
          :to="'https://bitrix24public.com/b24-l12664.bitrix24.ru/docs/pub/e656905b09fa602e0aeb129129ed007a/default/?&'">
          Положение о межрегиональной службе консультирования родителей социально-психологического центра ФГБОУ ВО ВГСПУ
        </CommonLink>
        <div class="contacts">
          <a href="tel:+7-800-444-2232p771" class="contacts__phone-number text-primary">
            8 (800) 444-22-32
            <span class="contacts__phone-number_optional">(доб. 711)</span>
          </a>
          <a href="tel:+78004442232" class="phone-wrapper">
            <IconPhone />
          </a>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--q-background-primary);

  .contentWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    padding: 48px 0;
    font-size: 16px;
    max-width: var(--maxContentWidth);
    @media screen and (max-width: $mobile-max-width) {
      flex-direction: column;
      overflow: hidden;
    }
  }

  .footer__col-1 {
    display: flex;
    width: 290px;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: $mobile-max-width) {
      display: none;
    }

    .col-1__vgspu {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .col-1__vgspu_img {
      width: 70px;
      height: 72px;
    }

    .col-1__vgspu_title {
      width: 200px;
      color: $Text-color;
      font-size: 18px;
      font-weight: 700;
      line-height: 139%;
      text-transform: uppercase;
    }

    .col-1__btn_border {
      margin: 0 10px 0 0;
      color: $grey-2;
    }

    .col-1__btn_label {
      color: $Blue-lighter;
      font-size: 16px;
      line-height: 120%;
    }
  }
}

.footer__col-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: $mobile-max-width) {
    margin-bottom: 16px;
  }
  .col-2_links {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .col-2_link {
    color: $black;
  }

  .col-2_icons {
    display: flex;
    gap: 12px;
  }
}

.footer__col-3 {
  display: flex;
  justify-content: space-between;
  width: 540px;
  flex-direction: column;

  @media screen and (max-width: $mobile-max-width) {
    margin-bottom: 16px;
    width: 100%;
    gap: 16px;
  }

  .col-3__link {
    cursor: default;
  }
}

.link {
  font-size: 16px;
  color: $grey-2;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

//Чисто прикинул
@media screen and (width < 1280px) {
  .footer {
    padding: 12px 20px;
  }
}

.metodic_material {
  margin-top: 16px;
  a {
    color: $black;
  }
  @media screen and (min-width: $mobile-max-width) {
    display: none;
  }
}

.contacts {
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media screen and (min-width: $mobile-max-width) {
    font-size: 16px;
    justify-content: center;
    margin: 0 10px 0 0;
    display: none;
  }
  .contacts__phone-number {
    font-size: 20px;
    margin: 0 38px 0 0;
    text-decoration: none;

    .contacts__phone-number_optional {
      color: $grey-2;
    }
  }
}
</style>

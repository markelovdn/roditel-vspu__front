<script setup lang="ts">
import CommonLink from "@/components/common/CommonLink/CommonLink.vue";
import { headerMenuItems } from "@/components/common/TheHeader/types";
</script>

<template>
  <q-footer class="footer">
    <div class="contentWrapper">
      <div class="footer__col-1">
        <div class="col-1__vgspu">
          <q-img :src="'./public/img/icons/VGSPU.png'" class="col-1__vgspu_img" />
          <div class="col-1__vgspu_title">
            <span>Социально-психологический центр ВГСПУ</span>
          </div>
        </div>
        <q-btn outline class="col-1__btn_border">
          <div class="col-1__btn_label">Задать вопрос специалисту</div>
        </q-btn>
        <CommonLink :to="'https://ya.ru/'">Политика конфиденциальности</CommonLink>
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
        <!-- <div class="col-2_icons">
        <router-link to="">
          <IconTelegram />
        </router-link>
        <router-link to="">
          <IconWhatsapp />
        </router-link>
        <router-link to="">
          <IconSkype />
        </router-link>
      </div> -->
      </div>
      <div class="footer__col-3">
        <span class="text-primary col-3__link" :to="'https://ya.ru/'">
          Для жителей Волгограда и Волгоградской области возможны очные консультации по адресу г.Волгоград, проспект
          Ленина, 27
        </span>
        <CommonLink :to="'https://ya.ru/'">
          Приказ Об утверждении Положения о Межрегиональной службе консультирования родителей социально -
          психологическим центром "ВГСПУ"
        </CommonLink>
        <CommonLink :to="'https://ya.ru/'">
          Положение о межрегиональной службе консультирования родителей социально-психологического центра ФГБОУ ВО ВГСПУ
        </CommonLink>
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
  }

  .footer__col-1 {
    display: flex;
    width: 290px;
    flex-direction: column;
    gap: 20px;

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

  .col-3__link {
    cursor: default;
  }
}

//Чисто прикинул
@media screen and (width < 1280px) {
  .footer {
    padding: 12px 20px;
  }
}
</style>

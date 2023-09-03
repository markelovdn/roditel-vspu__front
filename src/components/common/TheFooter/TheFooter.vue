<script setup lang="ts">
import IconTelegram from "@/components/icons/IconTelegram.vue";
import IconWhatsapp from "@/components/icons/IconWhatsapp.vue";
import IconSkype from "@/components/icons/IconSkype.vue";
<<<<<<< HEAD
import CommonLink from "@/components/common/CommonLink/CommonLink.vue";
=======
import CommonLink from '@/components/common/CommonLink/CommonLink.vue'
>>>>>>> 239dde8 (Пофиксил вопросы по ревью)
</script>

<template>
  <q-footer class="footer">
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
        <router-link class="col-2_link btn-link" :to="'https://ya.ru'">Консультанты</router-link>
        <router-link class="col-2_link btn-link" :to="'https://ya.ru'">Вебинары</router-link>
        <router-link class="col-2_link btn-link" :to="'https://ya.ru'">Формы оказания услуг</router-link>
        <router-link class="col-2_link btn-link" :to="'https://ya.ru'">Кому оказывается помощь</router-link>
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
      <<<<<<< HEAD <span class="text-primary" :to="'https://ya.ru/'">Для жителей Волгограда и Волгоградской области
        возможны очные
        консультации по адресу г.Волгоград, проспект
        Ленина, 27
        </span>
        <CommonLink :to="'https://ya.ru/'">Приказ Об утверждении Положения о Межрегиональной службе консультирования
          родителей социально - психологическим
          центром "ВГСПУ"
        </CommonLink>
        <CommonLink :to="'https://ya.ru/'">Положение о межрегиональной службе консультирования родителей
          социально-психологического центра ФГБОУ ВО ВГСПУ
        </CommonLink>
        =======
        <CommonLink :color="'#315194'" :to="'https://ya.ru/'">Для жителей Волгограда и Волгоградской области возможны
          очные консультации по адресу
          г.Волгоград, проспект
          Ленина, 27</CommonLink>
        <CommonLink :to="'https://ya.ru/'">Приказ Об утверждении Положения о Межрегиональной службе консультирования
          родителей социально -
          психологическим
          центром "ВГСПУ"</CommonLink>
        <CommonLink :to="'https://ya.ru/'">Положение о межрегиональной службе консультирования родителей
          социально-психологического центра ФГБОУ ВО
          ВГСПУ</CommonLink>
        >>>>>>> 239dde8 (Пофиксил вопросы по ревью)
    </div>
  </q-footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $white;
  padding: 48px 80px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  <<<<<<< HEAD font-size: 16px;

  =======>>>>>>>239dde8 (Пофиксил вопросы по ревью) .footer__col-1 {
    width: 290px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .col-1__vgspu {
      width: 100%;
      display: flex;
      justify-content: space-between;
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
      <<<<<<< HEAD padding: 15px 30px;
      margin: 0 10px 0 0;
      color: $grey-2;
      =======color: $grey-2;
      margin: 0 10px 0 0;
      >>>>>>>239dde8 (Пофиксил вопросы по ревью)
    }

    .col-1__btn_label {
      color: $Blue-lighter;
      <<<<<<< HEAD font-size: 16px;
      line-height: 120%;
      =======>>>>>>>239dde8 (Пофиксил вопросы по ревью)
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
    text-decoration: none;
  }

  .col-2_icons {
    display: flex;
    gap: 12px;
  }
}

.footer__col-3 {
  width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .col-3__link {
    color: $Blue-lighter;
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

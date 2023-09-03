<script setup lang="ts">
import IconTelegram from '@/components/icons/IconTelegram.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconSkype from '@/components/icons/IconSkype.vue'
</script>

<template>
  <q-footer class="footer">
    <div class="footer__col-1">
      <div class="col-1__vgspu">
        <q-img :src="'./public/img/icons/VGSPU.png'" class="col-1__vgspu_img " />
        <div class="col-1__vgspu_title">
          <span>Социально-психологический центр ВГСПУ</span>
        </div>

      </div>
      <q-btn outline class="col-1__btn_border">
        <div class="col-1__btn_label" style="color: #315194; font-weight: 500;">Задать вопрос специалисту</div>
      </q-btn>
      <span class="col-1__politicks">Политика конфиденциальности</span>
    </div>
    <div class="footer__col-2">
      <div class="col-2_links">
        <router-link class="col-2_link" :to="'https://ya.ru'">Консультанты</router-link>
        <router-link class="col-2_link" :to="'https://ya.ru'">Вебинары</router-link>
        <router-link class="col-2_link" :to="'https://ya.ru'">Формы оказания услуг</router-link>
        <router-link class="col-2_link" :to="'https://ya.ru'">Кому оказывается помощь</router-link>
      </div>
      <div class="col-2_icons">
        <router-link to="">
          <IconTelegram />
        </router-link>
        <router-link to="">
          <IconWhatsapp />
        </router-link>
        <router-link to="">
          <IconSkype />
        </router-link>
      </div>
    </div>
    <div class="footer__col-3">
      <span class="col-3__text_blue">Для жителей Волгограда и Волгоградской области возможны очные консультации по адресу
        г.Волгоград, проспект
        Ленина, 27</span>
      <span>Приказ Об утверждении Положения о Межрегиональной службе консультирования родителей социально -
        психологическим центром "ВГСПУ"</span>
      <span>Положение о межрегиональной службе консультирования родителей социально-психологического центра ФГБОУ ВО
        ВГСПУ</span>
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
}

.footer__col-1 {
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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
  color: $grey-2;
  margin: 0 10px 0 0;
}

.col-1__btn_label {
  color: $Blue-lighter;
}

.col-1__politicks {
  color: $grey-2;
  cursor: pointer;
}

.footer__col-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.footer__col-3 {
  width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: $grey-1;
}

.col-3__text_blue {
  color: $Blue-lighter
}


//Чисто прикинул
@media screen and (width < 1280px) {
  .footer {
    padding: 12px 20px;
  }
}
</style>

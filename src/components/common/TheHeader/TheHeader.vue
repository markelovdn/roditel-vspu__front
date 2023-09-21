<script setup lang="ts">
import { ref } from "vue";
import { headerMenuItems } from "./types";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconPersonal from "@/components/icons/IconPersonal.vue";
import LoginModal from "@/components/modals/LoginModal/LoginModal.vue";

const showLoginModal = ref(false);
</script>

<template>
  <q-header reveal class="bg-white header">
    <div class="row-1">
      <div class="logo">
        <router-link :to="'/'"><q-img class="logo__img" :src="'./public/img/icons/logo.png'"></q-img></router-link>
        <span class="logo__text">Социально-психологический центр ВГСПУ</span>
      </div>
      <div class="contacts">
        <a href="tel:+78004442232" class="contacts__phone-number text-primary">
          8 (800) 444-22-32
          <span class="contacts__phone-number_optional">(доб. 711)</span>
        </a>
        <a href="tel:+78004442232" class="phone-wrapper">
          <IconPhone />
        </a>

        <q-btn @click="showLoginModal = true" outline style="color: #f7b70b" class="personal-cabinet">
          <IconPersonal />
          <span class="personal-cabinet__label text-primary">Личный кабинет</span>
        </q-btn>
      </div>
    </div>
    <div class="row-2">
      <div class="links">
        <router-link class="links__link" v-for="(item, index) in headerMenuItems" :to="item.to" :key="index">
          {{ item.name }}
        </router-link>
      </div>
      <div class="flex no-wrap">
        <span class="cursor-pointer materials">Методические материалы</span>
        <div class="link-ask-expert">
          <div>Задать вопрос консультанту</div>
          <svg style="position: relative; top: -10px" xmlns="http://www.w3.org/2000/svg" width="100%" height="3"
            viewBox="0 0 218 3" preserveAspectRatio="none" fill="none">
            <path d="M0.0830078 1.8418H218.894" stroke="#F7B70B" stroke-width="2" stroke-dasharray="5 5" />
          </svg>
        </div>
      </div>
    </div>
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false"></LoginModal>
  </q-header>
</template>

<style lang="scss" scoped>
.header {
  padding: 12px 75px;
  white-space: nowrap;

  .row-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;

      .logo__img {
        width: 66px;
      }

      .logo__text {
        color: $Text-color;
        font-size: 18px;
        font-weight: 700;
        line-height: 139%;
        text-transform: uppercase;
        cursor: default;
      }
    }

    .contacts {
      display: flex;
      align-items: center;

      .contacts__phone-number {
        font-size: 20px;
        margin: 0 38px 0 0;
        text-decoration: none;

        .contacts__phone-number_optional {
          color: $grey-2;
        }
      }

      .phone-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 48px;
        height: 48px;
        border-radius: 10px;
        border: 1px solid #f3f3f3;
        background: $background;
        margin: 0 19px 0 0;
      }

      .personal-cabinet {
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        width: 200px;
        border-radius: 10px;
        border: solid 1px #f7b70b;
        padding: 12px 16px;

        .personal-cabinet__label {
          font-size: 16px;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .row-2 {
    display: flex;
    justify-content: space-between;
    font-size: 16px;

    .links {
      display: flex;
      gap: 32px;

      .links__link {
        color: $grey-2;
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;

        &:hover {
          color: $primary;
        }
      }
    }

    .materials {
      color: $primary;

      &:hover {
        color: $black;
      }
    }

    .link-ask-expert {
      color: $Text-color;
      margin: 0 0 0 32px;
      cursor: pointer;

      &:hover {
        color: $Blue-lighter;
      }
    }
  }
}
</style>

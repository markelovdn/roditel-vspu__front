<script setup lang="ts">
import { computed, ref } from "vue";

import IconPersonal from "@/components/icons/IconPersonal.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import LoginModal from "@/components/modals/LoginModal/LoginModal.vue";
import router from "@/router";

import { useAuthStore } from "../../../stores/authStore";
import { headerMenuItems } from "./types";

const authStore = useAuthStore();

const showLoginModal = ref(false);

const userCabinetButtontext = computed(() => {
  return authStore.getUserInfo ? "Личный кабинет" : "Войти";
});
const auth = () => {
  if (authStore.getUserInfo) {
    router.push({ name: "My" });
  } else {
    showLoginModal.value = true;
  }
};
const logout = () => {
  authStore.logout().then(() => router.push({ name: "Main" }));
};
</script>

<template>
  <q-header reveal class="header">
    <div class="contentWrapper">
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

          <q-btn outline style="color: #f7b70b" class="personal-cabinet" @click="auth()">
            <IconPersonal />
            <span class="personal-cabinet__label text-primary">{{ userCabinetButtontext }}</span>
          </q-btn>
          <q-btn
            v-if="authStore.isLoggedIn"
            size="xs"
            outline
            color="primary"
            class="q-ml-xs q-pa-xs"
            @click="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" class="logout-btn" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="var(--q-blue-lighter)"
                d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
            </svg>
          </q-btn>
        </div>
      </div>
      <div class="row-2">
        <div class="links">
          <router-link v-for="(item, index) in headerMenuItems" :key="index" class="links__link" :to="item.to">
            {{ item.name }}
          </router-link>
        </div>
        <div class="flex no-wrap">
          <span class="cursor-pointer materials">Методические материалы</span>
          <div class="link-ask-expert">
            <div>Задать вопрос консультанту</div>
            <svg
              style="position: relative; top: -10px"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="3"
              viewBox="0 0 218 3"
              preserveAspectRatio="none"
              fill="none">
              <path d="M0.0830078 1.8418H218.894" stroke="#F7B70B" stroke-width="2" stroke-dasharray="5 5" />
            </svg>
          </div>
        </div>
      </div>
      <LoginModal v-if="showLoginModal" @close="showLoginModal = false"></LoginModal>
    </div>
  </q-header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--q-background-primary);

  .contentWrapper {
    margin: 0 auto;
    padding: 12px 0 0;
    white-space: nowrap;
    max-width: var(--maxContentWidth);
  }

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
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        margin: 0 19px 0 0;
        background: $background;
        border: 1px solid #f3f3f3;
        border-radius: 10px;
      }

      .personal-cabinet {
        display: flex;
        justify-content: space-between;
        width: 200px;
        padding: 12px 16px;
        border-radius: 10px;
        cursor: pointer;

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
      margin: 0 0 0 32px;
      color: $Text-color;
      cursor: pointer;

      &:hover {
        color: $Blue-lighter;
      }
    }
  }
}
</style>

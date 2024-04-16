<script setup lang="ts">
import { getCssVar } from "quasar";
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthWrapper from "@/components/common/AuthWrapper/AuthWrapper.vue";
import TheFooter from "@/components/common/TheFooter/TheFooter.vue";
import TheHeader from "@/components/common/TheHeader/TheHeader.vue";
import { useAuthModal } from "@/hooks/useModal";

const route = useRoute();
const pageBackground = computed(() => {
  const backgroundName = (route?.meta?.background ?? "secondary") as string;

  return { background: getCssVar(`background-${backgroundName}`) };
});
const showHeaderOnRoute = computed(() => route.meta.footer);
useAuthModal();
</script>

<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <TheHeader />
    <q-page-container class="wrapper" :style="pageBackground">
      <q-page class="wrapper__content">
        <router-view />
      </q-page>
    </q-page-container>
    <TheFooter v-show="showHeaderOnRoute" />
    <AuthWrapper></AuthWrapper>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" class="scroll-top__btn" />
    </q-page-scroller>
  </q-layout>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow-x: hidden;

  &__content {
    width: var(--maxContentWidth);
    margin: 0 auto;
    padding: 70px 0;

    @media (max-width: 1270px) {
      width: 100%;
    }

    @media screen and (max-width: $mobile-max-width) {
      width: 100%;
      padding: 20px 4px 0px 10px;
      overflow-x: hidden;
    }
  }
}

.scroll-top__btn {
  border-radius: 50px;
  opacity: 0.6;
}
</style>

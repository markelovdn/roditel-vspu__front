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
const showHeaderOnRoute = computed(() => route.name !== "ResetPassword");
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
  </q-layout>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow-x: hidden;

  &__content {
    width: var(--maxContentWidth);
    margin: 0 auto;
    padding: 70px 0;

    @media screen and (width < 1280px) {
      width: 100%;
      padding: 20px 0;
    }

    @media screen and (max-width: $mobile-max-width) {
      // width: 730px;
      width: 100%;
      overflow-x: auto;
    }
  }
}
</style>

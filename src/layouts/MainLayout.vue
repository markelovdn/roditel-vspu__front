<script setup lang="ts">
import TheHeader from "@/components/common/TheHeader/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter/TheFooter.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getCssVar } from "quasar";

const route = useRoute();
const pageBackground = computed(() => {
  const backgroundName = (route?.meta?.background ?? "secondary") as string;

  return { background: getCssVar(`background-${backgroundName}`) };
});
</script>

<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <TheHeader />
    <q-page-container class="wrapper" :style="pageBackground">
      <q-page class="wrapper__content">
        <router-view />
      </q-page>
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow-x: hidden;

  &__content {
    width: var(--maxContentWidth);
    margin: 0 auto;

    @media screen and (width < 1280px) {
      width: 100%;
    }

    @media screen and (width < 721px) {
      width: 730px;
      overflow-x: auto;
    }
  }
}
</style>

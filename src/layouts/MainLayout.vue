<script setup lang="ts">
import TheHeader from "@/components/common/TheHeader/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter/TheFooter.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageBackground = computed(() => {
  const backgroundName = (route?.meta?.background ?? "secondary") as string;

  return `background: $background-${backgroundName})`;
});
</script>

<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <TheHeader />
    <q-page-container :style="pageBackground">
      <q-page style="padding-top: 60px" class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>

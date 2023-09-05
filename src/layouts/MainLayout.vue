<script setup lang="ts">
import TheHeader from "@/components/common/TheHeader/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter/TheFooter.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper.vue";

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
    <ModalWrapper :show="true">
      <template v-slot:header>
        <h4>
          Добавить данные
        </h4>
      </template>

      <template v-slot:subHeader>
        <span class="label-text">Введите свои данные для регистрации</span>
      </template>
      
      <template v-slot:form>
        <q-input class="q-input" borderless :modelValue="'adasdasd'"></q-input>
          <q-input class="q-input" borderless :modelValue="'adasdasd'"></q-input>
          <q-input class="q-input" borderless :modelValue="'adasdasd'"></q-input>
          <q-input class="q-input" borderless :modelValue="'adasdasd'"></q-input>
      </template>

      <template v-slot:footer>
        <q-button class="q-btn btn-link">asd</q-button>
      </template>
    </ModalWrapper>
  </q-layout>
</template>

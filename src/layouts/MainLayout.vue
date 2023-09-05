<script setup lang="ts">
import TheHeader from "@/components/common/TheHeader/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter/TheFooter.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper.vue";

const route = useRoute();

const pageBackground = computed(() => {
  const backgroundName = (route?.meta?.background ?? "secondary") as string;

  return `background: $background-${backgroundName})`;
});

const options : Array<String> = [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ];
const text = ref<String>('')
</script>

<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <TheHeader />
    <q-page-container :style="pageBackground">
      <q-page style="padding-top: 60px" class="q-pa-md">
        {{ text }}
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
        
        <label class="q-input--form-label">Ф.И.О.*</label>
        <q-input input-class="q-input--form" borderless color="primary" v-model:modelValue="text"></q-input>
        <label class="q-input--form-label">Телефон*</label>
        <q-input input-class="q-input--form" borderless :modelValue="''"></q-input>
        <label class="q-input--form-label">Почта*</label>
        <q-input input-class="q-input--form" borderless :modelValue="''"></q-input>
        <label class="q-input--form-label">Регион*</label>
        <q-select input-class="q-select--form" outlined :options="options" :modelValue="'Волгоградская область'" />
        <label class="q-input--form-label">Специализация*</label>
        <q-select input-class="q-select--form" outlined :options="options" :modelValue="'Школьники'" />
        <label class="q-input--form-label">Кем Вы являетесь*</label>
        <q-select input-class="q-select--form" outlined :options="options" :modelValue="'Психолог'" />
        <label class="q-input--form-label">Пароль*</label>
        <q-input input-class="q-input--form" borderless :modelValue="''"></q-input>
        <label class="q-input--form-label">Подтверждение пароля*</label>
        <q-input input-class="q-input--form" borderless :modelValue="''"></q-input>

      </template>

      <template v-slot:footer>
        <q-btn label="Регистрация" class="q-btn--form"></q-btn>
        <q-btn flat :ripple="false" color='grey-1' label="Закрыть"></q-btn>
      </template>
    </ModalWrapper>
  </q-layout>
</template>

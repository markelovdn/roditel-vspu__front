<script setup lang="ts">
import { ref } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const options: Array<string> = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
const text = ref<string>("");
</script>

<template>
  <ModalWrapper :show="true">
    <template v-slot:header>
      <h4>Добавить данные</h4>
    </template>

    <template v-slot:subHeader>
      <span class="label-text">Введите свои данные для регистрации</span>
    </template>

    <template v-slot:form>
      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Ф.И.О.*"
        borderless
        color="primary"
        :model-value="text"
      ></q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Телефон*"
        borderless
        :modelValue="''"
      ></q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Почта*"
        borderless
        :modelValue="''"
      ></q-input>

      <q-select
        input-class="q-select--form"
        label="Регион*"
        outlined
        class="fit q-mb-sm"
        :options="options"
        :modelValue="'Волгоградская область'"
      />

      <q-select
        input-class="q-select--form"
        label="Специализация*"
        outlined
        class="fit q-mb-sm"
        :options="options"
        :modelValue="'Школьники'"
      />

      <q-select
        class="fit q-mb-sm"
        input-class="q-select--form"
        label="Кем Вы являетесь*"
        outlined
        :options="options"
        :modelValue="'Психолог'"
      />

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Пароль*"
        borderless
        :modelValue="''"
      ></q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Подтверждение пароля*"
        borderless
        :modelValue="''"
      ></q-input>
    </template>

    <template v-slot:footer>
      <q-btn label="Регистрация" class="q-btn--form" color="primary"></q-btn>
      <q-btn class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" label="Закрыть"></q-btn>
    </template>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>

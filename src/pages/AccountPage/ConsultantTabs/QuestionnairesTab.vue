<script setup lang="ts"></script>

<template>
  <div>
    <router-link :to="'/questionnaires'">
      <q-btn outline style="color: #f7b70b" class="personal-cabinet">
        <IconPersonal />
        <span class="personal-cabinet__label text-primary">Создать анкету</span>
      </q-btn>
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>

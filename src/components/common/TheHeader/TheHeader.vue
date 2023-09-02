<script setup lang="ts">
import { headerMenuItems } from "./types";
</script>

<template>
  <q-header reveal class="bg-cyan">
    <q-toolbar>
      <q-btn flat round dense icon="assignment_ind" />

      <q-space />

      <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
      <q-btn flat round dense icon="gamepad" />
    </q-toolbar>

    <q-toolbar inset>
      <!-- TODO: стилизовать -->
      <router-link class="q-mr-lg" v-for="(item, index) in headerMenuItems" :to="item.to" :key="index">{{
        item.name
      }}</router-link>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { TConsultation } from "@/api/Consultations/types";

import SideBarItem from "./SideBarItem.vue";
defineEmits<{ (event: "setChangeChat", index: number): void }>();
defineProps<{ activeChat: number; consultations: TConsultation[] }>();
</script>

<template>
  <div class="sidebar-wrapper">
    <SideBarItem
      v-for="(item, index) in consultations"
      :key="index"
      :item="item"
      :is-active="activeChat === item.id"
      @click="$emit('setChangeChat', item.id)" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
}
</style>

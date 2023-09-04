<script setup lang="ts">
import { ref } from "vue";
import WebinarsTab from "./ParentTabs/WebinarsTab.vue";

const tab = ref("webinars");
const splitterModel = ref(20);
const tabs = [{ name: "webinars", label: "Вебинары", panelComponent: WebinarsTab }];
</script>

<template>
  <q-splitter v-model="splitterModel" style="height: 250px">
    <template v-slot:before>
      <q-tabs v-model="tab" vertical class="text-teal">
        <q-tab v-for="(tab, index) in tabs" :key="index" :name="tab.name" :label="tab.label" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel v-for="(tab, index) in tabs" :key="index" :name="tab.name">
          <component :is="tab.panelComponent"></component> </q-tab-panel
      ></q-tab-panels>
    </template>
  </q-splitter>
</template>

<style lang="scss" scoped></style>

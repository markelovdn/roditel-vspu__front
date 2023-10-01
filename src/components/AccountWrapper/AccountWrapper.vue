<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ComponentDefinition } from "@/types";
import { accountRoleMap } from "@/pages/AccountPage/types";

interface IAccountWrapperProps {
  tabs: Array<{ name: string; label: string; panelComponent: ComponentDefinition }>;
  title: string;
  //TODO: разобраться с типом и названием параметра
  accountRole: "parent" | "consultant" | string;
}

const props = defineProps<IAccountWrapperProps>();

const splitterModel = ref(20);
const tab = ref();

const openFirstTab = () => {
  if (props.tabs.length) {
    tab.value = props.tabs[0].name;
  }
};
const getUserRoleDefinition = (role: string) => {
  return accountRoleMap[role.toUpperCase() as keyof typeof accountRoleMap] ?? "";
};
onMounted(() => openFirstTab());
</script>

<template>
  <div>
    <div class="header">
      <h2 class="header__title q-mr-lg">{{ title }}</h2>
      <div class="header__role">{{ getUserRoleDefinition(accountRole) }}</div>
      <q-space />
      <div class="header__notifications">TODO</div>
    </div>
    <q-splitter class="tabsPanel" v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <!-- TODO: Сделать сохранение выбранной вкладки в route страницы, через q-route-tab или отдельный метод изменения route -->
          <q-tab v-for="(tab, index) in tabs" :key="index" :name="tab.name" :label="tab.label" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel v-for="(tab, index) in tabs" :key="index" :name="tab.name">
            <component :is="tab.panelComponent"></component>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: baseline;

  &__role {
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0em;
    color: #a3a3a3;
  }
}
</style>

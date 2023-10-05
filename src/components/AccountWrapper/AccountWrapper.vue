<script setup lang="ts">
import { onMounted, ref } from "vue";

import IconNotificationsBell from "@/components/icons/IconNotificationsBell.vue";
import { accountRoleMap } from "@/pages/AccountPage/types";
import { ComponentDefinition } from "@/types";

interface IAccountWrapperProps {
  tabs: Array<{ name: string; label: string; panelComponent: ComponentDefinition }>;
  title: string;
  accountRole: "parented" | "consultant" | string;
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
      <div class="header__notifications flex items-center justify-center">
        <IconNotificationsBell :count="12" />
      </div>
    </div>
    <q-splitter v-model="splitterModel" class="tabsPanel" disable :separator-class="'separator'">
      <template #before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
          :active-bg-color="'white'"
          :no-caps="true"
          :indicator-color="'white'"
          :content-class="'menu__point'"
          :active-class="'menu__point_active'">
          <!-- TODO: Сделать сохранение выбранной вкладки в route страницы, через q-route-tab или отдельный метод изменения route -->
          <q-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :content-class="'menu__point'"
            class="menu__point"
            :name="tab.name"
            :label="tab.label" />
        </q-tabs>
      </template>

      <template #after>
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
  margin: 70px 0 52px;

  &__role {
    color: $grey-1;
    line-height: 34px;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0;
  }

  &__notifications {
    width: 48px;
    height: 48px;
    background: var(--q-background-primary);
    border-radius: 10px;
    box-shadow: 0 4px 35px 0 rgb(46 56 144 / 8%);
    cursor: pointer;
  }
}

.tabsPanel {
  height: 100%;
  min-height: 600px;

  &:deep(.q-tab__label) {
    color: var(--q-blue-lighter, #315194);
    font-size: 18px;
    line-height: 120%;
  }
}

.menu {
  width: 300px;

  &__point {
    // cursor: pointer;
    color: var(--q-blue-lighter, #315194);
    line-height: 120% !important;
    // margin-bottom: 8px;
    // padding: 12px 18px;
    border-radius: 7px;
    font-size: 18px !important;

    &_active {
      color: var(--black, #313131);
      background: var(--q-background-primary, #fff);
      font-weight: 700 !important;
    }
  }
}
</style>

<style>
.separator {
  /* display: none; */
  width: 110px !important;
  background-color: var(--gray);
}
</style>

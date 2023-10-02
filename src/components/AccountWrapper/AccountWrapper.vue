<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ComponentDefinition } from "@/types";
import { accountRoleMap } from "@/pages/AccountPage/types";
import IconNotificationsBell from "@/components/icons/IconNotificationsBell.vue";


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
      <div class="header__notifications flex items-center justify-center">
        <IconNotificationsBell :count="12" />
      </div>
    </div>
    <!-- TODO Разобраться с стилизацией  separator/ after-->
    <q-splitter class="tabsPanel " v-model="splitterModel" disable>
      <template v-slot:before>
        <!-- TODO Разобраться со стилями активной вкладки -->
        <q-tabs v-model="tab" vertical class="text-teal" :active-bg-color="'white'" :no-caps="true"
          :indicator-color="'white'" :content-class="'menu__point'" :active-class="'menu__point_active'">
          <!-- TODO: Сделать сохранение выбранной вкладки в route страницы, через q-route-tab или отдельный метод изменения route -->
          <q-tab :content-class="'menu__point'" class="menu__point" v-for="(tab, index) in tabs" :key="index"
            :name="tab.name" :label="tab.label" />
        </q-tabs>
      </template>

      <template v-slot:separator>
        <div style="width: 50px;">
          fdgd
        </div>
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
  margin: 70px 0 52px;

  &__role {
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0em;
    color: $grey-1;
  }

  &__notifications {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: var(--q-background-primary);
    box-shadow: 0px 4px 35px 0px rgba(46, 56, 144, 0.08);
    cursor: pointer;
  }
}

.tabsPanel {
  height: 410px;

  &:deep(.q-tab__label) {
    color: var(--q-blue-lighter, #315194);
    font-size: 18px;
    line-height: 120%;
  }
}



.menu {
  width: 300px;

  &__point {
    // margin-bottom: 8px;
    // padding: 12px 18px;
    border-radius: 7px;
    // cursor: pointer;
    color: var(--q-blue-lighter, #315194);
    font-size: 18px !important;
    line-height: 120% !important;

    &_active {
      background: var(--q-background-primary, #fff);
      color: var(--black, #313131);
      font-weight: 700 !important;
      ;
    }
  }
}
</style>

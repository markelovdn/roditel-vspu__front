<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { accountRoleMap } from "@/pages/AccountPage/types";
import { ComponentDefinition } from "@/types";

import { useNotificationStore } from "../../stores/notificationStore";
import TheNotification from "../common/TheHeader/TheNotification.vue";

interface IAccountWrapperProps {
  tabs: Array<{ name: string; label: string; panelComponent: ComponentDefinition }>;
  title: string;
  accountRole: "parented" | "consultant" | "admin" | string;
}
const notificationsStore = useNotificationStore();
const props = defineProps<IAccountWrapperProps>();

const router = useRouter();
const route = useRoute();

const splitterModel = ref(20);
const tab = ref();

const openFirstTab = () => {
  const routeTabId = route.query.tabId;
  const tabExists = routeTabId && props.tabs.some((tab) => tab.name === routeTabId);

  if (tabExists) {
    tab.value = routeTabId;
  } else if (props.tabs.length > 0) {
    tab.value = props.tabs[0].name;
  }
};

const getUserRoleDefinition = (role: string) => {
  return accountRoleMap[role.toUpperCase() as keyof typeof accountRoleMap] ?? "";
};

const isShowNotificationPoint = (item: string) => {
  if (notificationsStore.notifications.messages && ["applications", "questions"].includes(item)) return true;
  if (notificationsStore.notifications.questionnaires && item === "questionnaires") return true;
  return false;
};

watch(tab, (newTab) => {
  if (newTab) {
    router.push({ query: { ...route.query, tabId: newTab } });
  }
  if (["applications", "questions"].includes(newTab)) notificationsStore.updateNotifications({ messages: true });
  if (newTab === "questionnaires") notificationsStore.updateNotifications({ questionnaires: true });
});

watch(
  () => route.query.tabId,
  (tabId) => {
    if (tabId) tab.value = tabId;
  },
);

onMounted(() => openFirstTab());
</script>

<template>
  <div>
    <div class="header">
      <h2 class="header__title q-mr-lg">{{ title }}</h2>
      <div class="header__role">{{ getUserRoleDefinition(accountRole) }}</div>
      <q-space />
      <TheNotification :count="notificationsStore.notifications.count" />
    </div>
    <q-splitter v-model="splitterModel" class="tabs-menu" disable :separator-class="'separator'">
      <template #before>
        <q-tabs
          v-model="tab"
          vertical
          :no-caps="true"
          indicator-color="transparent"
          content-class="'tabs-wrapper'"
          :active-class="'tabs-wrapper_active'">
          <!-- TODO: Сделать сохранение выбранной вкладки в route страницы, через q-route-tab или отдельный метод изменения route -->
          <q-tab
            v-for="(item, index) in tabs"
            :key="index"
            :content-class="'tabs-wrapper__tab'"
            class="tabs-wrapper__tab"
            :name="item.name">
            <div class="flex flex-center q-tab__label">
              {{ item.label }}
              <div v-if="isShowNotificationPoint(item.name)" class="red-cyrillic"></div>
            </div>
          </q-tab>
        </q-tabs>
      </template>

      <template #after>
        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel v-for="(item, index) in tabs" :key="index" :name="item.name">
            <component :is="item.panelComponent"></component>
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
  margin-bottom: 52px;

  @media screen and (max-width: $mobile-max-width) {
    h2 {
      font-size: 22px;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__role {
    color: $grey-1;
    line-height: 34px;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0;

    @media screen and (max-width: $mobile-max-width) {
      font-size: 12px;
      width: 50%;
    }
  }

  &__notifications {
  }
}

.tabs-menu {
  height: 100%;
  min-height: 600px;
}

.tabs-wrapper {
  width: 300px;
  &__tab {
    border-radius: 6px;
    justify-content: start;
    padding-left: 18px;
  }
  &__tab :deep(.q-tab__label) {
    color: var(--q-blue-lighter, #315194);
    line-height: 120%;
    border-radius: 7px;
    font-size: 18px;
  }
  &_active {
    background: var(--q-background-primary, #fff);
  }
  &_active :deep(.q-tab__label) {
    color: var(--black, #313131);
    background: transparent;
  }
}
:deep(.q-tab-panels) {
  background: transparent;
}
:deep(.q-tab-panel) {
  padding: 0;
}
:deep(.separator) {
  /* display: none; */
  width: 4px !important;
  background-color: transparent;
}

.red-cyrillic {
  width: 12px;
  height: 12px;
  margin-left: 12px;
  background-color: $red;
  border-radius: 50%;
}
</style>

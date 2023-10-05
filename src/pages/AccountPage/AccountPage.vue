<script setup lang="ts">
import { computedEager } from "@vueuse/core";

import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";
import { useAuthStore } from "@/stores/authStore";

import { consultantTabs } from "./ConsultantTabs/types";
import { parentTabs } from "./ParentTabs/types";
import { CONSULTANT_CODE } from "./types";

const authStore = useAuthStore();

const userData = computedEager(() => {
  return { role: authStore.getUserInfo?.role.code || "", fullName: authStore.getUserInfo?.fullName || "" };
});

const userTabs = computedEager(() =>
  userData.value.role.toUpperCase() === CONSULTANT_CODE ? consultantTabs : parentTabs,
);
</script>

<template>
  <AccountWrapper :tabs="userTabs" :title="userData.fullName" :account-role="userData.role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

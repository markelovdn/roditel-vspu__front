<script setup lang="ts">
import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";
import { computedEager } from "@vueuse/core";
import { consultantTabs } from "./ConsultantTabs/types";
import { parentTabs } from "./ParentTabs/types";
import { useUserStore } from '../../stores/userStore';
import { CONSULTANT_CODE } from "./types";

const userStore = useUserStore()

const getUserData = () => {
  return { role: userStore.user.role.code, fullName: userStore.user.fullName };
};

const userTabs = computedEager(() => (getUserData().role.toUpperCase() === CONSULTANT_CODE ? consultantTabs : parentTabs));
</script>

<template>
  <AccountWrapper :tabs="userTabs" :title="getUserData().fullName" :account-role="getUserData().role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

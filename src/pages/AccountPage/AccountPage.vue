<script setup lang="ts">
import { computedEager } from "@vueuse/core";
import { markRaw } from "vue";

import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";
import { useAuthStore } from "@/stores/authStore";

import { adminTabs } from "./AdminTabs/adminTabs";
import { consultantTabs } from "./ConsultantTabs/consultantTabs";
import { parentTabs } from "./ParentTabs/parentsTab";
import { ADMIN_CODE, CONSULTANT_CODE, PARENT_CODE } from "./types";

const authStore = useAuthStore();

const userData = computedEager(() => {
  return { role: authStore.getUserInfo?.role.code || "", fullName: authStore.getUserInfo?.fullName || "" };
});

const userTabs = computedEager(() => {
  const role = userData.value.role.toUpperCase();

  switch (role) {
    case CONSULTANT_CODE:
      return markRaw(consultantTabs);
    case PARENT_CODE:
      return markRaw(parentTabs);
    case ADMIN_CODE:
      return markRaw(adminTabs);
    default:
      // handle other roles or return a default set of tabs
      return markRaw(parentTabs);
  }
});
</script>

<template>
  <AccountWrapper :tabs="userTabs" :title="userData.fullName" :account-role="userData.role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

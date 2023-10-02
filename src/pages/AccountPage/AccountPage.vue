<script setup lang="ts">
import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";
import { computedEager } from "@vueuse/core";
import { consultantTabs } from "./ConsultantTabs/types";
import { parentTabs } from "./ParentTabs/types";
import { useUserStore } from '../../stores/userStore';

const user = useUserStore()

const getUserData = () => {
  //TODO: через стор получить и тп
  return { role: user.userRole?.code || '', fullName: user.user?.fullName || '' };
  return { role: "consultant", fullName: "Иванова Валентина Сергеевна" };
};
//TODO: "CONSULTANT" получать по ключу из константы или типа
const userTabs = computedEager(() => (getUserData().role.toUpperCase() === "CONSULTANT" ? consultantTabs : parentTabs));
</script>

<template>
  <AccountWrapper :tabs="userTabs" :title="getUserData().fullName" :account-role="getUserData().role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

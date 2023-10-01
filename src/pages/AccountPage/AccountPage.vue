<script setup lang="ts">
import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";
import { computedEager } from "@vueuse/core";
import { consultantTabs } from "./ConsultantTabs/types";
import { parentTabs } from "./ParentTabs/types";

const getUserData = () => {
  //TODO: через стор получить и тп
  return { role: "consultant", fullName: "Иванова Валентина Сергеевна" };
};
//TODO: "CONSULTANT" получать по ключу из константы или типа
const userTabs = computedEager(() => (getUserData().role.toUpperCase() === "CONSULTANT" ? consultantTabs : parentTabs));
</script>

<template>
  <AccountWrapper :tabs="userTabs" :title="getUserData().fullName" :account-role="getUserData().role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

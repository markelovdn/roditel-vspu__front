<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import AccountWrapper from "@/components/AccountWrapper/AccountWrapper.vue";

const tabs = [
  {
    name: "webinars",
    label: "Вебинары",
    panelComponent: defineAsyncComponent(() => import("./ParentTabs/WebinarsTab.vue")),
  },
  {
    name: "questions",
    label: "Вопросы",
    panelComponent: defineAsyncComponent(() => import("./ParentTabs/QuestionsTab.vue")),
  },
  {
    name: "questionaries",
    label: "Анкеты",
    panelComponent: defineAsyncComponent(() => import("./ParentTabs/QuestionariesTab.vue")),
  },
  {
    name: "personalData",
    label: "Персональные данные",
    panelComponent: defineAsyncComponent(() => import("./ParentTabs/PersonalDataTab.vue")),
  },
];

const getUserData = () => {
  //TODO: через стор получить и тп
  return { role: "parent", fullName: "Иванова Валентина Сергеевна" };
};
</script>

<template>
  <AccountWrapper :tabs="tabs" :title="getUserData().fullName" :account-role="getUserData().role"></AccountWrapper>
</template>

<style lang="scss" scoped></style>

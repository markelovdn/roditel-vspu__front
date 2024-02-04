<script setup lang="ts">
import { onMounted, ref } from "vue";

import { TUser } from "@/api/Auth/types";
import { TConsultation } from "@/api/Consultations/types";
import { useAuthStore } from "@/stores/authStore";
import { timeConvertor } from "@/utils/timeConvertor";

const props = defineProps<{ item: TConsultation; isActive: boolean }>();
const authStore = useAuthStore();
const interlocutor = ref({
  fullName: "",
  phone: "",
  email: "",
});

const getDays = () => {
  const days = new Date().getTime() - new Date(props.item.createdAt).getTime();
  return Math.floor(days / (1000 * 60 * 60 * 24));
};

const textColor = ref({
  "sidebar-item__status_green": getDays() === 0,
  "sidebar-item__status_yellow": getDays() >= 3,
  "sidebar-item__status_red": getDays() >= 6,
});
onMounted(() => {
  (function start() {
    if (props.item.users.length > 2) {
      interlocutor.value.fullName = "Поиск консультанта";
      return;
    }
    interlocutor.value.fullName =
      props.item.users.find((user: TUser) => user.id !== authStore.user?.id)?.fullName || "неизвестно";
    interlocutor.value.phone =
      props.item.users.find((user: TUser) => user.id !== authStore.user?.id)?.phone || "неизвестно";
    interlocutor.value.email =
      props.item.users.find((user: TUser) => user.id !== authStore.user?.id)?.email || "неизвестно";
  })();
});
</script>

<template>
  <div class="sidebar-item" :class="{ 'sidebar-item_active': isActive }">
    <div class="sidebar-item__box">
      <div class="sidebar-item__status" :class="textColor">Новый ({{ 7 - getDays() }} д.)</div>
      <div class="sidebar-item__date">{{ timeConvertor(item.createdAt, "dd/mm/yy") }}</div>
    </div>
    <div class="sidebar-item__box">
      <div class="sidebar-item__question" :class="textColor">{{ item.title }}</div>
      <div class="sidebar-item__question" :class="textColor"></div>
      <div class="sidebar-item__name">{{ interlocutor.fullName }}</div>
      <div class="sidebar-item__name">{{ interlocutor.phone }}</div>
      <div class="sidebar-item__name">{{ interlocutor.email }}</div>
      <div class="sidebar-item__name">{{ item.region }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  padding: 22px 20px 22px 36px;
  display: flex;
  gap: 8px;
  cursor: pointer;

  // background: rgba(228, 235, 246, 0.2);
  background-color: #ffffff;

  @media (max-width: 576px) {
    padding: 11px 10px 11px 18px;
  }

  &__box {
    display: flex;
    gap: 4px;
    flex-direction: column;
  }
  &__status {
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;

    &_green {
      color: var(--green, #00e38c);
    }
    &_yellow {
      color: var(--yellow, #f7b70b);
    }
    &_red {
      color: var(--error, #d00);
    }
  }
  &__date {
    color: $grey-2;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }
  &__question {
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }
  &__name {
    color: $grey-1;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
  }

  &_active {
    background: rgba(228, 235, 246, 0.5);
  }
}
</style>

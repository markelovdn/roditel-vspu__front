<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useParentStore } from "@/stores/parentStore";

import { TPersonalDataChildrenPayload } from "../types";
import ChildrenItem from "./ChildrenItem.vue";

const parentStore = useParentStore();
const data = ref<Omit<TPersonalDataChildrenPayload, "id">[]>([]);

const isEnoughChildren = computed(() => {
  if (data.value && data.value.length) {
    return data.value.length === 6;
  }

  return false;
});

const addChild = () => {
  data.value.push({ age: 3 });
};

const handleForm = () => {
  const promises = data.value.map((child) => {
    const numberedAge = Number(child.age);

    return parentStore.setChildrenAge(numberedAge);
  });
  Promise.allSettled(promises);
};

watch(
  () => parentStore.childrenData,
  () => {
    data.value = parentStore.childrenData.map((item) => {
      return { age: item.age };
    });
  },
);

onMounted(() => {
  parentStore.getChildren();
});
</script>

<template>
  <div class="personal-data">
    <div class="personal-data__wrapper">
      <div class="personal-data__header">
        <h5>Редактирование персональных данных</h5>
      </div>

      <q-form class="personal-data__form">
        <div v-for="(item, index) in data" :key="index" class="personal-data__box">
          <children-item v-model="data[index]" :index="index" />
        </div>

        <div class="personal-data__box">
          <q-btn
            v-if="!isEnoughChildren"
            label="Добавить ребенка"
            class="q-btn--form"
            color="primary"
            @click="addChild" />
        </div>
      </q-form>
      <div class="personal-data__block">
        <q-btn label="Сохранить изменения" class="q-btn--form" color="primary" @click="handleForm" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-data {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 15px 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__form {
    background-color: $white;
  }

  &__box {
    display: flex;
    gap: 20px;
    padding: 10px 35px;
    background-color: $white;
    border-radius: 0px 0px 10px 10px;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));
  }

  &__item {
    flex-basis: 100%;

    &--half {
      flex-basis: 48.7%;
    }
  }

  &__block {
    margin-top: 27px;
    display: flex;
  }

  &__img {
    height: 145px;
    max-width: 150px;
    border-radius: 50%;
  }
}
</style>
